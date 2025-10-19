const express = require("express");
const router = express.Router();

const { getUserById, getAllUser } = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/authRoles");

router.get(
  "/id/:id",
  authenticateToken,
  authorizeRoles("admin", "user"),
  getUserById,
);
router.get("/users", authenticateToken, authorizeRoles("admin"), getAllUser);

module.exports = router;
