import UserModel from "../models/User.Model.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../Services/Mail.Service.js";


// 🔹 Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};



// 🔹 Register User
export const registerUser = async (req, res, next) => {
  try {

    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Create user
    const user = new UserModel({
      username,
      email,
      password
    });

    await user.save();

    // Email verification token
    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Verification link
    const verificationLink =
      `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    const subject = "Verify your email";

    const text = `
Hello ${username},

Please verify your email by clicking the link below:

${verificationLink}
`;

    const html = `
      <div style="font-family:Arial">
        <h2>Hello ${username}</h2>
        <p>Please verify your email</p>

        <a href="${verificationLink}"
        style="padding:10px 20px;
        background:#4CAF50;
        color:white;
        text-decoration:none;
        border-radius:5px">
        Verify Email
        </a>
      </div>
    `;

    // Send mail
    await sendMail(email, subject, text, html);

    res.status(201).json({
      message: "User registered successfully. Verification email sent!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};



// 🔹 Login User
export const loginUser = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check email verification
    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email first"
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};



// 🔹 Get Profile
export const getUserProfile = async (req, res, next) => {
  try {

    const user = await UserModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    next(error);
  }
};



// 🔹 Verify Email
export const verifyEmail = async (req, res, next) => {
  try {

    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Token is required"
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email already verified"
      });
    }

    user.verified = true;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    next(error);
  }
};