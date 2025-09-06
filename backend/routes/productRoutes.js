import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ GET all products (public or protected if needed)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ POST create product (Admin only + image upload)
router.post("/", authAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Check all required fields
    if (!name || !description || !price || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert price to number
    const priceNum = Number(price);

    const product = new Product({
      name,
      description,
      price: priceNum,
      image: `/uploads/${req.file.filename}`, // store relative path
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ PUT update product (Admin only + optional image)
router.put("/:id", authAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const updatedFields = { name, description };
    if (price) updatedFields.price = Number(price);
    if (req.file) updatedFields.image = `/uploads/${req.file.filename}`;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ DELETE product (Admin only)
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
