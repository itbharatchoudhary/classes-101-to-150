import { Router } from "express";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();


/**
 * @Required email, password, fullname, contact, role
 * @Description Register a new user
 */
router.post("/register", validateRegisterUser, registerUser)

router.post("/login", validateLoginUser, loginUser)

export default router