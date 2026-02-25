const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Models/Auth.model");

// ======================================================
// TOKEN CREATION
// ======================================================
const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// ======================================================
// COOKIE CONFIGURATION
// ======================================================
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ======================================================
// REGISTER
// ======================================================
async function RegisterController(req, res) {
  try {
    const { username, email, password, bio, imageUrl } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const user = await User.create({
      username,
      email,
      password,
      bio,
      ...(imageUrl && { profile: { imageUrl } }),
    });

    const token = createToken(user._id);

    res.cookie("token", token, cookieOptions).status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ======================================================
// LOGIN
// ======================================================
async function LoginController(req, res) {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user._id);

    res.cookie("token", token, cookieOptions).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ======================================================
// LOGOUT
// ======================================================
function LogoutController(req, res) {
  res.clearCookie("token", cookieOptions).json({ message: "Logged out" });
}

// ======================================================
// GET CURRENT USER
// ======================================================
async function MeController(req, res) {
  const user = await User.findById(req.user.id);
  res.json(user);
}

// ======================================================
// UPDATE PROFILE
// ======================================================
async function UpdateProfileController(req, res) {
  const { username, bio, imageUrl } = req.body;

  const update = {
    ...(username && { username }),
    ...(bio && { bio }),
    ...(imageUrl && { profile: { imageUrl } }),
  };

  const user = await User.findByIdAndUpdate(req.user.id, update, {
    new: true,
  });

  res.json({ message: "Profile updated", user });
}

// ======================================================
// CHANGE PASSWORD
// ======================================================
async function ChangePasswordController(req, res) {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.comparePassword(currentPassword)))
    return res.status(401).json({ message: "Wrong password" });

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password changed successfully" });
}

// ======================================================
// REQUEST PASSWORD RESET
// ======================================================
async function ResetPasswordRequestController(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "If email exists, reset sent" });

  const token = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  res.json({
    message: "Password reset token generated",
    token, // send via email in production
  });
}

// ======================================================
// RESET PASSWORD WITH TOKEN
// ======================================================
async function ResetPasswordController(req, res) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.password = req.body.newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
}

// ======================================================
// EMAIL VERIFICATION
// ======================================================
async function VerifyEmailController(req, res) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
}

module.exports = {
  RegisterController,
  LoginController,
  LogoutController,
  MeController,
  UpdateProfileController,
  ChangePasswordController,
  ResetPasswordRequestController,
  ResetPasswordController,
  VerifyEmailController,
};

/*
WHAT THIS FILE DOES
- Handles all business logic
- Authenticates users
- Updates profile
- Manages password reset securely
- Supports email verification
*/