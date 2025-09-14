const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/auth");
const { getUser } = require("../controllers/userController");

router.get("/user", requireAuth, getUser);

module.exports = router;
