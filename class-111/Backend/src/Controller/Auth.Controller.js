const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/Auth.model");

// ===================== TOKEN CREATION =====================
const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// ===================== COOKIE CONFIG =====================
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ===================== REGISTER =====================
async function RegisterController(req, res) {
  try {
    const { username, email, password, bio, imageUrl } = req.body;

    // 1️⃣ Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }

    // 2️⃣ Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        message: existingUser.email === email ? "Email already registered" : "Username already taken",
      });
    }

    // 3️⃣ Create user (pre-save hook auto-hashes password)
    const newUser = await User.create({
      username,
      email,
      password, // <-- raw password, pre-save hook will hash
      bio,
      ...(imageUrl && { profile: { imageUrl } }),
    });

    // 4️⃣ Generate JWT
    const token = createToken(newUser._id);

    // 5️⃣ Send response with cookie
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
}

// ===================== LOGIN =====================
async function LoginController(req, res) {
  try {
    const { identifier, password } = req.body; // identifier = username or email
    if (!identifier || !password) {
      return res.status(400).json({ message: "Email/Username and password required" });
    }

    // Find user and include password explicitly
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user._id);

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}

// ===================== LOGOUT =====================
function LogoutController(req, res) {
  res.clearCookie("token", cookieOptions).status(200).json({ message: "Logged out successfully" });
}

module.exports = { RegisterController, LoginController, LogoutController };