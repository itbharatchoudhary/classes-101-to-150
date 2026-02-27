const express = require("express");
const router = express.Router();

const AuthController = require("../Controllers/Auth.controller");
const { protect } = require("../Middleware/Auth.middleware");

/* Public Routes */
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

/* Private Routes */
router.get("/me", protect, AuthController.getMe);
router.post("/logout", protect, AuthController.logout);

module.exports = router;