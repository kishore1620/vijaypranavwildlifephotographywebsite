// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./routes/adminRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"

import profileRoutes from "./routes/profileRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";




dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);


app.use("/api/products", productRoutes);

// serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
// app.use("/api/user", userRoutes);
app.use("/api/auth", userRoutes); // instead of "/api/user"

app.use("/api/profile", profileRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
