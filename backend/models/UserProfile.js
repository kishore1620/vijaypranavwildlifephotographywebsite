import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  profilePicture: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  country: { type: String },
  state: { type: String },
  district: { type: String },
  extraInfo: { type: String }
}, { timestamps: true });

export default mongoose.model("UserProfile", userProfileSchema);
