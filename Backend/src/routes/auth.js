const express = require("express");
const router = express.Router();
const {
  register,
  verify,
  login,
  refresh,
  logout,
} = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimit");

router.post("/register", authLimiter, register);
router.post("/verify/:token", authLimiter, verify);
router.post("/login", authLimiter, login);
router.post("/refresh", authLimiter, refresh);
router.post("/logout", logout);

module.exports = router;
