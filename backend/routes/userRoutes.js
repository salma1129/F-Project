const express = require("express");
const User = require("../models/User");
const router = express.Router();
const auth = require("../Middleware/auth");
const roleCheck = require("../Middleware/roleCheck");

// Get All Users (READ) - Admin/HR access only
router.get("/", auth, roleCheck(['admin', 'hr']), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create New User (CREATE) - Admin/HR access only
router.post("/create", auth, roleCheck(['admin', 'hr']), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new user
    user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update User (UPDATE) - Admin/HR access only
router.put("/:id", auth, roleCheck(['admin', 'hr']), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete User (DELETE) - Admin access only
router.delete("/:id", auth, roleCheck(['admin']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update current user profile
router.put("/me/update", auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select('-password');
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


