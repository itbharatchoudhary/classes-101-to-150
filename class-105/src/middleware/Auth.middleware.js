const jwt = require("jsonwebtoken");

/**
 * AUTH MIDDLEWARE
 * ----------------
 * - Reads token from cookies
 * - Verifies JWT
 * - Attaches user info to req.user
 * - Blocks request if token invalid or missing
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }

    // Attach authenticated user to request
    req.user = {
      id: decoded.id.toString(),
    };

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return res.status(401).json({
      message: "Unauthorized: Token verification failed",
    });
  }
};

module.exports = authMiddleware;