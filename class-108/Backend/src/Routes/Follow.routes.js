// ======================================================
// Follow.routes.js
// ======================================================
const express = require("express");
const router = express.Router();
const followController = require("../Controller/Follow.Controller");
const authMiddleware = require("../Middleware/Auth.middleware");

// ======================================================
// Parameter validation middleware
// ======================================================
const validateUserId = (req, res, next) => {
  const { userId } = req.params;
  if (!userId || userId.trim() === "") {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }
  next();
};

// ======================================================
// Protected Routes (requires login)
// ======================================================
router.post("/:userId", authMiddleware, validateUserId, followController.followUser);
router.delete("/:userId", authMiddleware, validateUserId, followController.unfollowUser);

// ======================================================
// Public Routes
// ======================================================
router.get("/followers/:userId", validateUserId, followController.getFollowers);
router.get("/following/:userId", validateUserId, followController.getFollowing);

module.exports = router;

/*
This router exposes:
✔ POST /:userId → follow a user
✔ DELETE /:userId → unfollow a user
✔ GET /followers/:userId → list followers
✔ GET /following/:userId → list following
All protected routes require authentication.
*/