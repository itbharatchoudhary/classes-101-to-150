const express = require("express");
const router = express.Router();

const followController = require("../Controller/Follow.Controller");
const protect = require("../middleware/Auth.middleware");


/* =========================================================
   Protected Routes (User must be logged in)
   ========================================================= */

router.post("/:userId", protect, followController.followUser);
router.delete("/:userId", protect, followController.unfollowUser);

/*
These routes require authentication.

POST   /api/follow/:userId   → Follow a user
DELETE /api/follow/:userId   → Unfollow a user

The protect middleware verifies JWT and attaches user info to req.user.
Only logged-in users can follow or unfollow someone.
*/


/* =========================================================
   Public Routes (No authentication required)
   ========================================================= */

router.get("/followers/:userId", followController.getFollowers);
router.get("/following/:userId", followController.getFollowing);

/*
These routes are public.

GET /api/follow/followers/:userId → Get list of followers
GET /api/follow/following/:userId → Get users someone follows

Anyone can view follower/following lists.
*/


module.exports = router;

/*
Exports the router so it can be used in the main server file.

Example usage in app.js or server.js:

app.use("/api/follow", require("./Routes/Follow.routes"));

This connects all follow-related endpoints under /api/follow.
*/