import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/Auth.Route.js";
import morgan from "morgan";
import cors from "cors";
import chatRouter from "./Routes/Chat.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
}))

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: `Server is running on port ${PORT}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);


app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;
