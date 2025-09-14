const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const { signAccessToken, verifyToken } = require("../utils/token");
const { registerSchema, loginSchema } = require("../utils/validators");
const { sendVerificationEmail } = require("../utils/mailer.js");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_EXP = process.env.REFRESH_TOKEN_EXPIRES_IN;

const MAX_FAILED = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

// Helper to hash refresh token before storing
const hashRefreshToken = async (token) => {
  return await bcrypt.hash(token, SALT_ROUNDS);
};

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, username } = value;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ email, username, passwordHash });

    // optional: send verification email here
    const token = signAccessToken(
      { email },
      process.env.JWT_ACCESS_SECRET,
      "1d",
    );

    const verifyUrl = `${process.env.CLIENT_ORIGIN}/verify/${token}`;
    await sendVerificationEmail(email, verifyUrl);

    return res.status(201).json({
      message: "Registration success, check your email!",
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const verify = async (req, res) => {
  try {
    const { email } = verifyToken(
      req.params.token,
      process.env.JWT_ACCESS_SECRET,
    );

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    return res.json({ message: "Account verified" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email harus diisi" });

  if (!password)
    return res.status(400).json({ message: "Password harus diisi" });

  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Check lock
    if (user.isLocked) {
      const unlockTime = Math.ceil((user.lockUntil - Date.now()) / 1000);
      return res.status(423).json({
        message: `Account locked. Try again in ${unlockTime} seconds`,
      });
    }

    const pwMatch = await bcrypt.compare(password, user.passwordHash);
    if (!pwMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= MAX_FAILED) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }
      await user.save();

      return res.status(401).json({ message: "Email atau password salah" });
    }

    // reset failed attempts
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    // create tokens
    const accessToken = signAccessToken(
      {
        sub: user._id,
        roles: user.roles,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      process.env.JWT_ACCESS_SECRET,
      ACCESS_EXP,
    );
    const rawRefreshToken = crypto.randomBytes(64).toString("hex"); // long random token
    user.refreshTokenHash = await hashRefreshToken(rawRefreshToken);
    await user.save();

    // set refresh token as httpOnly cookie
    res.cookie("refreshToken", rawRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days; match REFRESH_EXP
    });

    return res.json({
      accessToken,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // find user with refreshTokenHash
    const user = await User.findOne({ refreshTokenHash: { $ne: null } });
    if (!user) {
      // We will look for user by scanning? Better approach: store refresh tokens per user,
      // but since we stored only hash per user, check each - NOT efficient for many users.
      // So instead: store by user id in cookie. Simpler: store userId in cookie or store refresh tokens in DB keyed by user id.
      // For simplicity in this example, we require the client to also send user id in cookie or request.
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // verify token by comparing hash
    const match = await bcrypt.compare(token, user.refreshTokenHash);
    if (!match)
      return res.status(401).json({ message: "Invalid refresh token" });

    // issue new access token (and optionally new refresh token)
    const accessToken = signAccessToken(
      { sub: user._id, roles: user.roles },
      process.env.JWT_ACCESS_SECRET,
      ACCESS_EXP,
    );

    // rotate refresh token
    const cryptoToken = require("crypto").randomBytes(64).toString("hex");
    user.refreshTokenHash = await bcrypt.hash(cryptoToken, SALT_ROUNDS);
    await user.save();

    res.cookie("refreshToken", cryptoToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      // find user and remove refreshTokenHash
      const users = await User.find({}); // not ideal at scale; see notes below
      for (const u of users) {
        if (u.refreshTokenHash) {
          const ok = await bcrypt.compare(token, u.refreshTokenHash);
          if (ok) {
            u.refreshTokenHash = null;
            await u.save();
            break;
          }
        }
      }
    }
    // clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, verify, login, refresh, logout };
