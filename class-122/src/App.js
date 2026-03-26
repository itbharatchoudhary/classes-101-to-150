// Main Application Entry Point
// Sets up Express server with middleware, routes, and environment configuration.
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/Auth.Route.js";

// Load environment variables securely
dotenv.config();

// Initialize Express application
const app = express();

// Define server port (fallback to 3000 if not provided)
const PORT = process.env.PORT || 3000;

//   GLOBAL MIDDLEWARES

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests
app.use(cookieParser());

// HEALTH CHECK ROUTE

// Purpose: Verify server is running
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

// API ROUTES

// Auth routes for user authentication
app.use("/api/auth", authRouter);

// GLOBAL ERROR HANDLER (Fallback)
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// Export app for server startup (separation of concerns)
export default app;
