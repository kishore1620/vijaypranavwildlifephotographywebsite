// controllers/orderController.js
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("❌ Order save error:", error.message); // log readable error
    res.status(500).json({ message: "Failed to save order", error: error.message });
  }
};
