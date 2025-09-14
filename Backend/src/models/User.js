const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ["user"] },

    // refresh token (store hashed refresh token)
    refreshTokenHash: { type: String, default: null },

    // brute force protection
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },

    isVerified: { type: Boolean, default: false }, // optional email verification
  },
  { timestamps: true },
);

// virtual
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

module.exports = mongoose.model("User", userSchema);
