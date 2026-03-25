import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
} from "../Controllers/Auth.Controller.js";
import {
  registerValidator,
  loginValidator,
} from "../Validators/Auth.Validator.js";
import { protect } from "../Middleware/Auth.Middleware.js";

const authRouter = Router();

// PUBLIC ROUTES
/**
 * Register user
 */
authRouter.post("/register", registerValidator, register);

/**
 * Login user
 */
authRouter.post("/login", loginValidator, login);

/**
 * Verify email
 */
authRouter.get("/verify-email", verifyEmail);

// PRIVATE ROUTES (Protected)

/**
 * Logout user (requires authentication)
 */
authRouter.post("/logout", protect, logout);

/**
 * Get current logged-in user
 */
authRouter.get("/me", protect, getMe);

export default authRouter;
