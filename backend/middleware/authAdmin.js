// backend/middleware/authAdmin.js
import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // remove "Bearer " if present
    const cleanToken = token.replace("Bearer ", "");

    jwt.verify(cleanToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }

      req.admin = decoded; // decoded contains { id: admin._id }
      next();
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export default authAdmin;
