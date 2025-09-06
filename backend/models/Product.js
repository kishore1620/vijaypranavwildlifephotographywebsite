// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
