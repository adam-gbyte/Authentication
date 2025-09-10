const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

app.set("json spaces", 2);

// middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Api is running..." });
});

// test protected route
const { requireAuth } = require("./middleware/auth");
app.get("/api/protected", requireAuth, (req, res) => {
  res.json({
    message: "Ini adalah kalimat yang di protect atau di jaga.",
    user: req.user,
  });
});

module.exports = app;
