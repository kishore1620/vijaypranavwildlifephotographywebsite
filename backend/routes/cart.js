// routes/cart.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// GET cart for a user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    if (!cart) return res.status(200).json([]); // empty array if no cart
    res.status(200).json(cart.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST add item to cart
router.post("/:userId", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({ userId: req.params.userId, products: [{ productId, quantity }] });
    } else {
      const existing = cart.products.find(p => p.productId.toString() === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update quantity
router.put("/:userId", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (cart) {
      const product = cart.products.find(p => p.productId.toString() === productId);
      if (product) product.quantity = quantity;
      await cart.save();
      res.status(200).json(cart.products);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE remove item
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
      await cart.save();
      res.status(200).json(cart.products);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE clear entire cart
router.delete("/:userId/clear", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      cart.products = [];
      await cart.save();
    }
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
