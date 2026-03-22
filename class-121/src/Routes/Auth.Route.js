import { Router } from "express";
import { register, verifyEmail } from "../Controllers/Auth.controller.js";
import { registerValidator } from "../Validators/Auth.validator.js";

const authRouter = Router();

/**
 * Handle user registration request with validation
 */
authRouter.post("/register", registerValidator, async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Handle email verification using token query
 */
authRouter.get("/verify-email", async (req, res, next) => {
  try {
    await verifyEmail(req, res);
  } catch (error) {
    next(error);
  }
});

export default authRouter;
