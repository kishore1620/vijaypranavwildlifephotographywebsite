import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Get user cart
router.get("/:userId", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) cart = await Cart.create({ userId: req.params.userId, cart: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add/Update item
router.post("/:userId", async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({ userId: req.params.userId, cart: [] });
    }

    const existing = cart.cart.find((item) => item.productId.toString() === productId);

    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      cart.cart.push({ productId, name, price, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update quantity (inc/dec)
router.put("/:userId", async (req, res) => {
  try {
    const { productId, action } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.cart.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (action === "inc") item.quantity += 1;
    else if (action === "dec") item.quantity = Math.max(1, item.quantity - 1);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.cart = cart.cart.filter((item) => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cart
router.delete("/:userId", async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.params.userId }, { cart: [] });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
