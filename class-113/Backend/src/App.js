const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/Auth.routes");

const app = express();

/* =========================
   Global Middlewares
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/* =========================
   Health Check Route
========================= */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

/* =========================
   API Routes
========================= */
app.use("/api/auth", authRoutes);

/* =========================
   404 Handler
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   Global Error Handler
========================= */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;