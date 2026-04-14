import { Router } from "express";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { registerUser, loginUser, googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
const router = Router();


/**
 * @Required email, password, fullname, contact, role
 * @Description Register a new user
 */
router.post("/register", validateRegisterUser, registerUser)

/**
 * @Required email, password
 * @Description Login a user
 */
router.post("/login", validateLoginUser, loginUser)

/**
 * @Description Google OAuth login
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @Description Google OAuth callback
 */
router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: config.NODE_ENV === "development" ?  "http://localhost:5173/login" : "/login"
    }),
    googleCallback,
);

export default router