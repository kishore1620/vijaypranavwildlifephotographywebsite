// backend/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js"; // ✅ make sure you have Order model here

const router = express.Router();

// Save order
router.post("/", async (req, res) => {
  try {
    console.log("Incoming order:", req.body);

    const {
      userId,     // optional now
      username,
      address,
      pincode,
      district,
      payment,
      items,
      total,
    } = req.body;

    // Basic validation
    if (!username || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      userId: userId || null, // ✅ allow guest
      username,
      address,
      pincode,
      district,
      payment,
      items,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch orders by userId (if logged in)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
