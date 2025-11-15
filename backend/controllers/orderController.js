// controllers/orderController.js
import Order from "../models/Order.js";

/* ===========================================================
   1️⃣ CREATE ORDER
   =========================================================== */
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      username,
      address,
      pincode,
      district,
      payment,
      items,
      total,
    } = req.body;

    if (!username || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      userId: userId || null,
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
  } catch (error) {
    console.error("❌ Order save error:", error.message);
    res.status(500).json({ message: "Failed to save order", error: error.message });
  }
};

/* ===========================================================
   2️⃣ GET ORDERS FOR SPECIFIC USER
   =========================================================== */
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ===========================================================
   3️⃣ GET ALL ORDERS (ADMIN)
   =========================================================== */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

/* ===========================================================
   4️⃣ GET SINGLE ORDER (DETAILS + TRACKING)
   =========================================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

/* ===========================================================
   5️⃣ UPDATE ORDER STATUS (ADMIN)
   =========================================================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* ===========================================================
   6️⃣ DELETE ORDER (ADMIN)
   =========================================================== */
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};
