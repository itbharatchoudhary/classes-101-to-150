import jwt from "jsonwebtoken";

/**
 * Generate JWT token for authenticated user
 * @param {string} userId - Unique user identifier
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId) => {
  try {
    // Validate required userId input
    if (!userId) {
      throw new Error("User ID is required for token generation");
    }

    // Ensure JWT secret exists in environment
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment");
    }

    // Create and return signed JWT token
    const token = jwt.sign(
      { id: userId },
      jwtSecret,
      { expiresIn: "7d" }
    );

    return token;
  } catch (error) {
    // Handle token generation errors safely
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
  }
};