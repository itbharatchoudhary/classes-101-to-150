import { Router } from 'express';
import { sendMessage, getChats, getMessages, deleteChat } from "../Controllers/Chat.Controller.js";
import { authUser } from "../Middleware/Auth.Middleware.js";

const chatRouter = Router();


chatRouter.post("/message", authUser, sendMessage)

chatRouter.get("/", authUser, getChats)

chatRouter.get("/:chatId/messages", authUser, getMessages)

chatRouter.delete("/delete/:chatId", authUser, deleteChat)

export default chatRouter;