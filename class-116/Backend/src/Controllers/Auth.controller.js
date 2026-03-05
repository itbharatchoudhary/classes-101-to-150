const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");
const { setCache, getCache } = require("../Config/Cache");

/**
 * =========================================================
 * Generate JWT Token
 * Creates signed token with expiration
 * =========================================================
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};


/**
 * =========================================================
 * REGISTER USER
 * Creates new account
 * Returns JWT token
 * =========================================================
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


/**
 * =========================================================
 * LOGIN USER
 * Verifies credentials
 * Updates last login time
 * =========================================================
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


/**
 * =========================================================
 * LOGOUT USER
 * Stores token in Redis blacklist
 * Token automatically expires based on JWT expiry
 * =========================================================
 */
exports.logout = async (req, res, next) => {
  try {
    let token;

    /**
     * Extract token from Authorization header
     */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token required",
      });
    }

    /**
     * Decode token to calculate remaining lifetime
     * TTL ensures Redis auto-removes expired tokens
     */
    const decoded = jwt.decode(token);
    const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);

    /**
     * Store token in Redis blacklist
     * Key format: blacklist:<token>
     */
    await setCache(`blacklist:${token}`, "true", expiresInSeconds);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};


/**
 * =========================================================
 * GET CURRENT USER
 * Returns authenticated user data
 * =========================================================
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};