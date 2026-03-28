import {Router} from "express";
import { sendMessage } from "../Controllers/Chat.Controller";
import { authUser } from "../Middleware/Auth.Middleware";

const chatRouter = Router();

chatRouter.post("/message",authUser, sendMessage)

export default chatRouter;