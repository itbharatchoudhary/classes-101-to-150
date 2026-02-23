const jwt = require("jsonwebtoken");

/*
|--------------------------------------------------------------------------
| AUTHENTICATION MIDDLEWARE
|--------------------------------------------------------------------------
| Purpose:
| - Extract JWT token from cookies
| - Verify token integrity and expiration
| - Attach authenticated user data to request object
| - Prevent access if authentication fails
|
| Usage:
| app.use("/protected-route", authMiddleware);
|
*/

const authMiddleware = (req, res, next) => {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1️⃣ EXTRACT TOKEN FROM COOKIE
    |--------------------------------------------------------------------------
    | Reads token safely using optional chaining.
    | If token is missing → block request immediately.
    */
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Token not provided.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 2️⃣ VERIFY JWT TOKEN
    |--------------------------------------------------------------------------
    | - Validates signature using secret key
    | - Checks token expiration automatically
    | - Throws error if token is invalid or expired
    */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /*
    |--------------------------------------------------------------------------
    | 3️⃣ VALIDATE TOKEN PAYLOAD
    |--------------------------------------------------------------------------
    | Ensures token contains required user identifier.
    | This protects against malformed or tampered tokens.
    */
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 4️⃣ ATTACH USER TO REQUEST
    |--------------------------------------------------------------------------
    | Makes authenticated user info available
    | to all next middleware/controllers.
    */
    req.user = {
      id: String(decoded.id),
    };

    /*
    |--------------------------------------------------------------------------
    | 5️⃣ CONTINUE REQUEST FLOW
    |--------------------------------------------------------------------------
    | Authentication successful → proceed to next handler.
    */
    next();
  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | 6️⃣ ERROR HANDLING
    |--------------------------------------------------------------------------
    | Handles:
    | - Expired tokens
    | - Invalid signatures
    | - Unexpected failures
    */
    console.error("AUTH MIDDLEWARE ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Authentication failed. Please login again.",
    });
  }
};

module.exports = authMiddleware;