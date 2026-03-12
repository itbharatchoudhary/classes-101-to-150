import jwt from "jsonwebtoken";

export const AuthUser = (req, res, next) => {
  try {

    let token = null;

    // 1️⃣ Get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2️⃣ Get token from Authorization header
    if (!token && req.headers.authorization) {

      const authHeader = req.headers.authorization;

      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }

    }

    // 3️⃣ If no token found
    if (!token) {
      return res.status(401).json({
        message: "No token provided, authorization denied"
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Attach decoded user to request
    req.user = decoded;

    next();

  } catch (error) {

    console.error("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid token, authorization denied"
    });

  }
};