const express = require("express");
const authMiddleware = require("../middleware/Auth.middleware");

const {
  RegisterController,
  LoginController,
  LogoutController,
  MeController,
  UpdateProfileController,
  ChangePasswordController,
  ResetPasswordRequestController,
  ResetPasswordController,
  VerifyEmailController,
} = require("../Controller/Auth.Controller");

const router = express.Router();

// ======================================================
// PUBLIC ROUTES
// ======================================================
router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/reset-password", ResetPasswordRequestController);
router.post("/verify-email", VerifyEmailController);

// ======================================================
// PROTECTED ROUTES
// ======================================================
router.post("/logout", authMiddleware, LogoutController);
router.get("/me", authMiddleware, MeController);
router.put("/update", authMiddleware, UpdateProfileController);
router.post("/change-password", authMiddleware, ChangePasswordController);

// Token-based password reset
router.post("/reset-password/confirm", ResetPasswordController);

module.exports = router;

/*
WHAT THIS FILE DOES
- Defines API endpoints
- Separates public and protected routes
- Applies auth middleware where required
*/