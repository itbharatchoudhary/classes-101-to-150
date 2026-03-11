import express from "express";
import AuthRoutes from "./Routes/Auth.Routes"

const app = express();

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;