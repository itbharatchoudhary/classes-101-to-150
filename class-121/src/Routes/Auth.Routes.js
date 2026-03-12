// src/Routes/Auth.Routes.js
import express from "express";
import { registerUser, loginUser } from "../Controllers/Auth.Controller.js";
import { registerValidator, loginValidator } from "../Validators/Auth.Validators.js"; 
import validateRequest from "../Middlewares/ValidateRequest.js";
const router = express.Router();

// Register Route
router.post("/register", registerValidator, validateRequest, registerUser);

// Login Route
router.post("/login", loginValidator, validateRequest, loginUser);

export default router;