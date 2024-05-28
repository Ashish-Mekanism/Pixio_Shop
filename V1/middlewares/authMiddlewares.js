import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken._id);

    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(401).json({
      error: error.message || "Invalid request!",
    });
  }
};
