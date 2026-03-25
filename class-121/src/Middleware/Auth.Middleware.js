import jwt from "jsonwebtoken";
import UserModel from "../Models/User.Model.js";

/**
 * Protect middleware
 * Verifies JWT token and attaches authenticated user to request
 */
export async function protect(req, res, next) {
  try {
    let token;

    // ================================
    // GET TOKEN FROM COOKIE OR HEADER
    // ================================
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ================================
    // TOKEN NOT FOUND
    // ================================
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // ================================
    // VERIFY TOKEN
    // ================================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ================================
    // FIND USER
    // ================================
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ================================
    // ATTACH USER TO REQUEST
    // ================================
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}