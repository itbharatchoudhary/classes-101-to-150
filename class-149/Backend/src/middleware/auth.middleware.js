import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
import {config} from "../config/config.js";

export const AuthenticateUser = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const AuthenticateSeller = async(req, res, next) => {
    const token = req.cookies.token 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = user;
        next();
       
    } catch (error) {
        console.log(token)
        return res.status(401).json({ message: "Invalid token" });
    }
};