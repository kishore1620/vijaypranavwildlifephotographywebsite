import express from "express";
import multer from "multer";
import UserProfile from "../models/UserProfile.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Save or update profile
router.post("/save", upload.single("profilePicture"), async (req, res) => {
  const { userId, name, email, phone, address, country, state, district, extraInfo } = req.body;

  try {
    let profile = await UserProfile.findOne({ userId });

    if (profile) {
      profile.set({
        name, email, phone, address, country, state, district, extraInfo,
        profilePicture: req.file ? req.file.path : profile.profilePicture
      });
      await profile.save();
    } else {
      profile = new UserProfile({
        userId, name, email, phone, address, country, state, district, extraInfo,
        profilePicture: req.file ? req.file.path : ""
      });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving profile" });
  }
});

// Fetch profile by userId
router.get("/:userId", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

export default router;
