const jwt = require("jsonwebtoken");

/* =========================
   PROTECT MIDDLEWARE
   Verifies JWT and attaches user to request
========================= */
exports.protect = (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token → unauthorized
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};