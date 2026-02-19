const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

// ================= TOKEN HELPER =================
const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );
};

// ================= COOKIE OPTIONS =================
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

// ================= REGISTER =================
async function RegisterController(req, res) {
  try {
    const { username, email, password, bio, imageUrl } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ message: "Username already taken" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      bio,
      ...(imageUrl && { profile: { imageUrl } })
    });

    await newUser.save();

    const token = createToken(newUser._id);

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          bio: newUser.bio,
          profile: newUser.profile
        }
      });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ================= LOGIN (email OR username) =================
async function LoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email/Username and password required" });
    }

    const user = await User.findOne({
      $or: [
        { email: email },
        { username: email }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profile: user.profile
        }
      });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ================= LOGOUT =================
function LogoutController(req, res) {
  res
    .clearCookie("token", cookieOptions)
    .json({ message: "Logged out successfully" });
}

module.exports = {
  RegisterController,
  LoginController,
  LogoutController
};
