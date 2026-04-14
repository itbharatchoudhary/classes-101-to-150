import { Router } from "express";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { registerUser, loginUser, googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";
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

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);



export default router