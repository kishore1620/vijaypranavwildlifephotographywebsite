// controllers/productController.js
import Product from "../models/Product.js";


// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;
    const product = new Product({ name, description, image, price });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
