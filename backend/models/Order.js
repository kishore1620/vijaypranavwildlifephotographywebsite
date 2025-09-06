import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // ✅ not required
  username: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String },
  district: { type: String },
  payment: { type: String, default: "COD" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
