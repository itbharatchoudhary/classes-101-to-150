// src/Routes/Auth.Routes.js
import express from "express";
import { registerUser, loginUser, verifyEmail, getUserProfile } from "../Controllers/Auth.Controller.js";
import { registerValidator, loginValidator } from "../Validators/Auth.Validators.js";
import validateRequest from "../Middlewares/ValidateRequest.js";
import { AuthUser } from "../Middlewares/Auth.Middleware.js";
const router = express.Router();

// Register Route
/**
 * @route POST /api/auth/register
 * @desc Register a new user and send verification email
 * @access Public
 * @body { username: String, email: String, password: String }
 * @returns { message: String, user: Object }
 */
router.post("/register", registerValidator, validateRequest, registerUser);

// Login Route
/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 * @body { email: String, password: String }
 * @returns { message: String, user: Object, token: String }
 */
router.post("/login", loginValidator, validateRequest, loginUser);

// Profile Route
/**
 * @route GET /api/auth/profile
 * @desc Get authenticated user's profile
 * @access Private
 * @returns { message: String, user: Object }
 */
router.get("/profile", AuthUser, getUserProfile);

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token: String }
 * @returns { message: String }
 */
router.get('/verify-email', verifyEmail);

export default router;