const userModel = require("../models/userModel");

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel
      .findById(id)
      .select("-passwordHash -refreshTokenHash -__v");

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find().select("-passwordHash -__v");

    if (!users) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserById,
  getAllUser,
};
