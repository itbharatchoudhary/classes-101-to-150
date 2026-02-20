// ======================================================
// 1. Core Dependencies
// ======================================================
const express = require("express");
const cookieParser = require("cookie-parser");

/*
Core framework setup.

express        → Web framework for handling HTTP requests
cookieParser   → Parses cookies for authentication/session handling
*/


// ======================================================
// 2. Route Imports
// ======================================================
const AuthRoutes = require("./Routes/Auth.routes");
const PostRoutes = require("./Routes/Post.routes");
const FollowRoutes = require("./Routes/Follow.routes");

/*
Each route file handles a specific domain:

AuthRoutes     → Login, register, authentication
PostRoutes     → Post creation and management
FollowRoutes   → Follow/unfollow + followers system
*/


// ======================================================
// 3. Create Express App
// ======================================================
const app = express();

/*
Creates the Express application instance.
All middleware and routes attach to this object.
*/


// ======================================================
// 4. Global Middlewares
// ======================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
Global middleware applied to every request:

express.json()        → Parses JSON request body
express.urlencoded()  → Parses form data
cookieParser()        → Makes cookies accessible via req.cookies
*/


// ======================================================
// 5. API Routes
// ======================================================
app.use("/api/auth", AuthRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/follow", FollowRoutes);

/*
API Route Mounting:

/api/auth    → Authentication endpoints
/api/posts   → Post related endpoints
/api/follow  → Follow system endpoints

Example endpoints after mounting:

POST   /api/follow/:userId
DELETE /api/follow/:userId
GET    /api/follow/followers/:userId
GET    /api/follow/following/:userId
*/


// ======================================================
// 6. Health Check Route
// ======================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully"
  });
});

/*
Basic server health check.
Used by browsers, monitoring tools, or deployment platforms.
*/


// ======================================================
// 7. 404 Not Found Handler
// ======================================================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
Handles requests to unknown routes.
Prevents hanging requests and gives clear API response.
*/


// ======================================================
// 8. Global Error Handler
// ======================================================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/*
Centralized error handler.

Catches:
✔ Controller errors
✔ Middleware errors
✔ Database errors
✔ Async errors

Keeps responses consistent across the API.
*/


// ======================================================
// 9. Export App
// ======================================================
module.exports = app;

/*
Exports Express app for use in server.js

Example usage:

const app = require("./app");
app.listen(5000);
*/