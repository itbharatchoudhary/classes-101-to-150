import { config } from "../config/config.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * @description Helper function to generate JWT token, set cookie and send response
 */

async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id
    },
        config.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000    // 7 days
    });

    res.status(200).json({
        success: true,
        message, //  dynamic
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            contact: user.contact,
            role: user.role
        }
    });
}

/**
 * @Required email, password, fullname, contact, role
 * @Description Register a new user
 */

export const registerUser = async (req, res) => {
    const { email, password, fullname, contact, isSeller } = req.body;
    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email,
            password,
            fullname,
            contact,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse(user, res, "Registration successful");

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

/**
 * @Required email, password    
 * @Description Login a user
 */

export const loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // ✅ FIX 1: use bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // ✅ FIX 2: actually CALL the function
        await sendTokenResponse(user, res, "Login successful");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const googleCallback = async (req, res) => {
    console.log(req.user)

    res.redirect("http://localhost:5173/")
}
