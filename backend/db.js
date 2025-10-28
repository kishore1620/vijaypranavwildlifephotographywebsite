// backend/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error(
        "MONGO_URI is not defined in your .env file! Please check .env"
      );
    }

    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:");
    console.error(err.message);
    console.error("\n💡 Possible causes:");
    console.error("- Incorrect cluster host name in the URI");
    console.error("- Password has special characters that need URL encoding");
    console.error("- Your IP is not whitelisted in MongoDB Atlas");
    console.error("- Network/DNS issues (try pinging the cluster host)");
    process.exit(1);
  }
};

export default connectDB;
