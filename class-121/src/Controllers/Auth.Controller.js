import crypto from "crypto";
import { sendEmail } from "../Services/Mail.service.js";
import { getVerificationEmailTemplate } from "../Services/EmailTemplate.js";
import UserModel from "../Models/User.model.js";
import { generateToken } from "../Utils/generateToken.js";

/**
 * Handle user registration and email verification flow
 * @route POST /api/auth/register
 * @access Public
 */
export async function register(req, res) {
  try {
    //  Extract and sanitize user input
    const { username, email, password } = sanitizeInput(req.body);

    //  Validate required fields
    if (!username || !email || !password) {
      return sendError(res, 400, "All fields are required");
    }

    //  Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return sendError(res, 409, "User already exists");
    }

    //  Create new user record
    const user = await UserModel.create({ username, email, password });

    //  Generate and assign verification token
    const { rawToken, hashedToken, expiresAt } = createVerificationToken();

    user.verificationToken = hashedToken;
    user.verificationTokenExpires = expiresAt;

    await user.save();

    //  Build email verification link
    const verificationLink = buildVerificationLink(rawToken);

    //  Send verification email
    await sendVerificationEmail(user, verificationLink);

    //  Generate authentication token
    const token = generateToken(user._id);

    //  Set secure cookie
    setAuthCookie(res, token);

    //  Send success response
    return res.status(201).json({
      success: true,
      message: "User registered. Please verify your email.",
    });

  } catch (error) {
    // Log internal error safely
    console.error("Register Error:", error);

    return sendError(res, 500, "Server error");
  }
}

/**
 * Sanitize incoming user input
 */
function sanitizeInput({ username, email, password }) {
  return {
    username: username?.trim(),
    email: email?.toLowerCase().trim(),
    password: password?.trim(),
  };
}

/**
 * Generate secure email verification token
 */
function createVerificationToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = Date.now() + 15 * 60 * 1000;

  return { rawToken, hashedToken, expiresAt };
}

/**
 * Build verification URL using environment config
 */
function buildVerificationLink(token) {
  return `${process.env.SERVER_URL}/api/auth/verify-email?token=${token}`;
}

/**
 * Send verification email to user
 */
async function sendVerificationEmail(user, link) {
  await sendEmail({
    to: user.email,
    subject: "Verify Your Email - MyPerplexity",
    html: getVerificationEmailTemplate(user.username, link),
    text: link,
  });
}

/**
 * Set authentication cookie securely
 */
function setAuthCookie(res, token) {
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