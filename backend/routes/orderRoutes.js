// backend/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getUserOrders);        // user orders
router.get("/all", getAllOrders);      // admin
router.get("/:id", getOrderById);      // order details + tracking
router.put("/status/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
