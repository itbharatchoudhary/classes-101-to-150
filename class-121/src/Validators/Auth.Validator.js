import { body, validationResult } from "express-validator";

/**
 * Handle validation errors from request
 * Ensures request data meets defined rules
 */
export const validateRequest = (req, res, next) => {
  try {
    // Extract validation errors from request
    const errors = validationResult(req);

    // Return formatted error response if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatErrors(errors.array()),
      });
    }

    // Proceed to next middleware if valid
    next();
  } catch (error) {
    // Handle unexpected validation processing errors
    return res.status(500).json({
      success: false,
      message: "Internal validation error",
    });
  }
};

/**
 * Format validation errors into consistent structure
 * @param {Array} errors - Raw validation errors
 * @returns {Array} formatted errors
 */
const formatErrors = (errors) => {
  return errors.map((err) => ({
    field: err.path,
    message: err.msg,
  }));
};

/**
 * Validation rules for user registration
 * Ensures required fields meet constraints
 */
export const registerValidator = [
  // Validate username field constraints
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  // Validate email format and normalize
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // Validate password strength requirements
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

  // Final middleware to check validation result
  validateRequest,
];