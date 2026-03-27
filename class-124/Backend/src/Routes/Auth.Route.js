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
import { authUser } from "../Middleware/Auth.Middleware.js";


const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc  l Register a new user
 * @access Public
 * @body {username, email, password}
 */
authRouter.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc  login user and enter JWT Token
 * @access Public
 * @body {email, password}
 */
authRouter.post("/login", loginValidator, login);

/**
 * @route GET /api/auth/verify-email
 * @desc  Verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get("/verify-email", verifyEmail);

/**
 * @route POST /api/auth/logout
 * @desc  User logged out
 * @access Public
 * @body {email, password}
 */
authRouter.post("/logout", authUser , logout);

/**
 * @route POST/api/auth/login
 * @desc  login user and enter JWT Token
 * @access Public
 * @body {email, password}
 */
authRouter.get("/me", authUser, getMe);

export default authRouter;
