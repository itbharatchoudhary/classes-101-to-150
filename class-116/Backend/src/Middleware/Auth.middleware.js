const jwt = require("jsonwebtoken");
const Blacklist = require("../Models/Blacklist.model");

/* =========================
   PROTECT MIDDLEWARE
   Verifies JWT
   Checks if token is blacklisted
   Attaches user to request
========================= */
exports.protect = async (req, res, next) => {
  try {
    let token;

    /* =========================
       Extract token from Authorization header
       Format: Bearer <token>
    ========================= */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /* =========================
       If token not provided → Unauthorized
    ========================= */
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    /* =========================
       Check if token is blacklisted
       Prevents access after logout
    ========================= */
    const isBlacklisted = await Blacklist.isBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked",
      });
    }

    /* =========================
       Verify JWT signature and decode payload
    ========================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* =========================
       Attach user ID to request
       Used in protected controllers
    ========================= */
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};