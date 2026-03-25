import crypto from "crypto";
import UserModel from "../Models/User.Model.js";
import { generateToken } from "../Utils/generateToken.js";
import { sendEmail } from "../Services/Mail.Service.js";
import { getVerificationEmailTemplate } from "../Services/EmailTemplate.js";

/**
 * Register new user and send email verification
 */
export async function register(req, res) {
  try {
    // Sanitize incoming registration data
    const { username, email, password } = sanitizeRegister(req.body);

    // Validate required input fields
    if (!username || !email || !password) {
      return sendError(res, 400, "All fields are required");
    }

    // Check if user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return sendError(res, 409, "User already exists");
    }

    // Create new user in database
    const user = await UserModel.create({ username, email, password });

    // Generate secure email verification token
    const { rawToken, hashedToken, expiresAt } =
      createVerificationToken();

    // Assign verification token to user
    user.verificationToken = hashedToken;
    user.verificationTokenExpires = expiresAt;
    await user.save();

    // Build email verification link
    const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email?token=${rawToken}`;

    // Send verification email to user
    await sendEmail({
      to: user.email,
      subject: "Verify Email",
      html: getVerificationEmailTemplate(user.username, verificationLink),
    });

    // Generate auth token and set cookie
    const token = generateToken(user._id);
    setCookie(res, token);

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Registered successfully. Verify email.",
    });
  } catch (error) {
    // Log internal server errors securely
    console.error("Register Error:", error.message);
    return sendError(res, 500, "Server error");
  }
}

/**
 * Verify user email using token
 */
export async function verifyEmail(req, res) {
  try {
    // Extract token from query params
    const { token } = req.query;

    // Validate token presence
    if (!token) {
      return sendError(res, 400, "Invalid token");
    }

    // Hash token for database comparison
    const hashedToken = hashToken(token);

    // Find user with valid token and expiry
    const user = await UserModel.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() },
    });

    // Handle invalid or expired token
    if (!user) {
      return sendError(res, 400, "Token expired or invalid");
    }

    // Mark user as verified and clear token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    // Log error without exposing sensitive details
    console.error("Verify Email Error:", error.message);
    return sendError(res, 500, "Server error");
  }
}

/**
 * Authenticate user and return session token
 */
export async function login(req, res) {
  try {
    // Sanitize login input data
    const { email, password } = sanitizeLogin(req.body);

    // Validate required login fields
    if (!email || !password) {
      return sendError(res, 400, "All fields required");
    }

    // Fetch user with password field explicitly selected
    const user = await UserModel.findOne({ email }).select("+password");

    // Validate credentials securely
    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, 401, "Invalid credentials");
    }

    // Ensure email is verified before login
    if (!user.isVerified) {
      return sendError(res, 403, "Verify email first");
    }

    // Generate auth token and set cookie
    const token = generateToken(user._id);
    setCookie(res, token);

    // Send login success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    // Log error safely for debugging
    console.error("Login Error:", error.message);
    return sendError(res, 500, "Server error");
  }
}

/**
 * Logout user by clearing auth cookie
 */
export function logout(req, res) {
  // Clear authentication cookie securely
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.json({
    success: true,
    message: "Logged out",
  });
}

/**
 * Get current authenticated user data
 */
export async function getMe(req, res) {
  try {
    // Fetch user excluding sensitive fields
    const user = await UserModel.findById(req.user._id).select("-password");

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GetMe Error:", error.message);
    return sendError(res, 500, "Server error");
  }
}

/**
 * Sanitize registration input fields
 */
function sanitizeRegister({ username, email, password }) {
  return {
    username: username?.trim(),
    email: email?.toLowerCase().trim(),
    password: password?.trim(),
  };
}

/**
 * Sanitize login input fields
 */
function sanitizeLogin({ email, password }) {
  return {
    email: email?.toLowerCase().trim(),
    password: password?.trim(),
  };
}

/**
 * Generate secure verification token
 */
function createVerificationToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");

  return {
    rawToken,
    hashedToken: hashToken(rawToken),
    expiresAt: Date.now() + 15 * 60 * 1000,
  };
}

/**
 * Hash token using SHA256 algorithm
 */
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Set secure authentication cookie
 */
function setCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

/**
 * Send standardized error response
 */
function sendError(res, statusCode, message) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}