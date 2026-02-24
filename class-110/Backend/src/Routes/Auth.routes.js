const express = require("express");
const authMiddleware = require("../middleware/Auth.middleware");
const { RegisterController, LoginController, LogoutController } = require("../Controller/Auth.Controller");

const router = express.Router();

// ================= PUBLIC ROUTES =================
router.post("/register", RegisterController); // Register new user
router.post("/login", LoginController);       // Login user

// ================= PROTECTED ROUTES =================
router.post("/logout", authMiddleware, LogoutController); // Logout user (requires authentication)

module.exports = router;

/*
Auth Routes:
- Public routes → register, login
- Protected routes → logout (requires valid JWT)
*/