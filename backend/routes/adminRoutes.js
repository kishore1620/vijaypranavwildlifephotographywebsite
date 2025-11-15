// backend/routes/adminRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();


// =========================
// ADMIN SIGNUP
// =========================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.json({ msg: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// ADMIN LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =========================
// PROTECTED ADMIN DASHBOARD
// =========================
router.get("/dashboard", authAdmin, (req, res) => {
  res.json({
    msg: "Welcome to Admin Dashboard",
    adminId: req.admin.id,
  });
});


// ===================================================================
// 🔥🔥 USER MANAGEMENT ROUTES (This is what your frontend needs)
// ===================================================================

// Get all users
router.get("/users", authAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Delete user
router.delete("/users/:id", authAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// Block / Unblock user
router.put("/users/block/:id", authAdmin, async (req, res) => {
  try {
    const { blocked } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { blocked },
      { new: true }
    );

    res.json({ message: "Status updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;
