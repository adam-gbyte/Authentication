const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = require("../models/userModel");

const { sendVerificationEmail } = require("../utils/mailer");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await userModel.findOne({ username });
    const existingEmail = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ field: "username", message: "Username sudah terdaftar" });
    }

    if (existingEmail) {
      return res
        .status(409)
        .json({ field: "email", message: "Email sudah terdaftar" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.create({ email, username, passwordHash });

    const token = jwt.sign({ email }, JWT_ACCESS_SECRET, { expiresIn: "1d" });
    const verifyUrl = `${CLIENT_ORIGIN}/verify/${token}`;
    await sendVerificationEmail(email, verifyUrl);

    return res.status(201).json({
      message: "Registration success, check your email!",
      user: user.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "Registrasi error" });
  }
};

const verify = async (req, res) => {
  const token = req.params.token;
  try {
    const { email } = jwt.verify(token, JWT_ACCESS_SECRET);

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    return res.json({ message: "Account verified" });
  } catch (error) {
    return res.status(500).json({ message: "Verify error" });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    const accessToken = jwt.sign(
      {
        sub: user._id,
        roles: user.roles,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    // Simpan refreshTokenHash ke mongoDB
    const rawRefreshToken = crypto.randomBytes(64).toString("hex");
    user.refreshTokenHash = await bcrypt.hash(rawRefreshToken, SALT_ROUNDS);
    await user.save();

    // Simpan refreshToken ke cookie
    res.cookie("refreshToken", rawRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    // Simpan userId ke cookie
    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Kirim accessToken ke Frontend
    return res.json({
      accessToken,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login error" });
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const user = await userModel.findOne({ refreshTokenHash: { $ne: null } });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const match = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!match) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      {
        sub: user._id,
        roles: user.roles,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    // Simpan refreshTokenHash ke mongoDB
    const rawRefreshToken = require("crypto").randomBytes(64).toString("hex");
    user.refreshTokenHash = await bcrypt.hash(rawRefreshToken, SALT_ROUNDS);
    await user.save();

    // Simpan refreshToken ke cookie
    res.cookie("refreshToken", rawRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    // Simpan userId ke cookie
    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Kirim accessToken ke Frontend
    return res.json({
      accessToken,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Refresh error" });
  }
};

const logout = async (req, res) => {
  const token = req.cookies?.refreshToken;
  const userId = req.cookies?.userId;

  try {
    if (token && userId) {
      const user = await userModel.findById(userId);
      if (user && user.refreshTokenHash) {
        const ok = await bcrypt.compare(token, user.refreshTokenHash);
        if (ok) {
          user.refreshTokenHash = null;
          await user.save();
        }
      }
    }

    // Hapus semua cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie("userId", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({ message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Logout error" });
  }
};

module.exports = {
  register,
  verify,
  login,
  refresh,
  logout,
};
