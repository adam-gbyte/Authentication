const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: "Terlalu banyak request pada route ini, coba lagi nanti.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter };
