// ======================================================
// 1. Core Dependencies
// ======================================================
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

/*
Core Express & Security libraries:
- express: web framework
- cookieParser: parses cookies from requests
- cors: handles cross-origin requests
- helmet: sets secure HTTP headers
- morgan: logs HTTP requests in development
*/


// ======================================================
// 2. Feature Routes
// ======================================================
const AuthRoutes = require("./Routes/Auth.routes");
const PostRoutes = require("./Routes/Post.routes");
const FollowRoutes = require("./Routes/Follow.routes");
const LikeRoutes = require("./Routes/Like.routes");

/*
Organized routes by feature for modularity:
- AuthRoutes: login, signup, token refresh
- PostRoutes: create/read/update/delete posts
- FollowRoutes: follow/unfollow users
- LikeRoutes: like/unlike posts
*/


// ======================================================
// 3. Initialize Express Application
// ======================================================
const app = express();

/*
All middlewares, routes, and error handling will be attached here.
*/


// ======================================================
// 4. Security Middlewares
// ======================================================
app.use(helmet());

app.use(cors({
  origin: true,       // Dynamically allow frontend origin
  credentials: true   // Allow cookies to be sent across domains
}));

/*
Secures API by:
- Adding HTTP headers (helmet)
- Controlling which clients can access API (cors)
*/


// ======================================================
// 5. Global Parsing Middlewares
// ======================================================
app.use(express.json({ limit: "10mb" }));          // Parse JSON payloads
app.use(express.urlencoded({ extended: true }));  // Parse form submissions
app.use(cookieParser());                           // Parse cookies from requests

/*
Enables the server to handle:
- JSON requests
- URL-encoded form submissions
- Cookies sent by clients
*/


// ======================================================
// 6. Development Logger
// ======================================================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Logs requests in development
}

/*
Helps track API activity during development for debugging.
No effect in production.
*/


// ======================================================
// 7. Mount API Routes
// ======================================================
app.use("/api/auth", AuthRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/follow", FollowRoutes);
app.use("/api/likes", LikeRoutes);

/*
Organizes API by features:
- Auth: /api/auth
- Posts: /api/posts
- Follow: /api/follow
- Likes: /api/likes
*/


// ======================================================
// 8. Health Check Endpoint
// ======================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully"
  });
});

/*
Used by monitoring tools or frontend to check if server is alive.
*/


// ======================================================
// 9. 404 Not Found Middleware
// ======================================================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
Catches requests to undefined routes.
Prevents hanging requests and gives consistent JSON response.
*/


// ======================================================
// 10. Global Error Handler
// ======================================================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/*
Central error handling for:
- Controllers
- Middlewares
- Database errors
Provides consistent response format.
*/


// ======================================================
// 11. Export Express App
// ======================================================
module.exports = app;

/*
Keeps app setup modular:
- server.js handles server startup
- App.js handles middleware and routing setup
*/