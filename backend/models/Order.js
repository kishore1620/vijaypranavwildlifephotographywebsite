import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

    username: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String },
    district: { type: String },

    payment: { type: String, default: "COD" },

    // ⭐ ITEMS LIST
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },

        // ⭐ NEW FIELD → product image support
        image: { type: String, default: "" },
      },
    ],

    // ⭐ TOTAL PRICE
    total: { type: Number, required: true },

    // ⭐ NEW FIELD → Order Status (very important)
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Shipped", "Out for Delivery", "Delivered"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
