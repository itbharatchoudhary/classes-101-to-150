const Follow = require("../Models/Follow.model");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

/* =========================================================
   Helper: Validate MongoDB ObjectId
   ========================================================= */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/*
This helper ensures the provided user ID is a valid MongoDB ObjectId.
It prevents database errors and improves API reliability.
*/


/* =========================================================
   Follow a User
   POST /api/follow/:userId
   ========================================================= */
exports.followUser = asyncHandler(async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.userId;

  // Validate ID format
  if (!isValidObjectId(followingId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Prevent self-follow
  if (followerId === followingId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  // Check existing relationship
  const alreadyFollowing = await Follow.findOne({
    follower: followerId,
    following: followingId
  });

  if (alreadyFollowing) {
    return res.status(409).json({ message: "Already following this user" });
  }

  // Create follow relationship
  const follow = await Follow.create({
    follower: followerId,
    following: followingId
  });

  res.status(201).json({
    success: true,
    message: "User followed successfully",
    data: follow
  });
});

/*
This endpoint creates a follow relationship between two users.
It validates input, prevents duplicates, and ensures a user cannot follow themselves.
Returns the created follow document.
*/


/* =========================================================
   Unfollow a User
   DELETE /api/follow/:userId
   ========================================================= */
exports.unfollowUser = asyncHandler(async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.userId;

  if (!isValidObjectId(followingId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const follow = await Follow.findOneAndDelete({
    follower: followerId,
    following: followingId
  });

  if (!follow) {
    return res.status(404).json({
      success: false,
      message: "Follow relationship not found"
    });
  }

  res.json({
    success: true,
    message: "User unfollowed successfully"
  });
});

/*
This endpoint removes a follow relationship.
If no relationship exists, it returns a 404 error.
Otherwise, it deletes the record and confirms success.
*/


/* =========================================================
   Get Followers of a User
   GET /api/followers/:userId
   ========================================================= */
exports.getFollowers = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const followers = await Follow.find({ following: userId })
    .populate("follower", "username email profilePic")
    .lean();

  res.json({
    success: true,
    count: followers.length,
    data: followers
  });
});

/*
This endpoint returns all users who follow a specific user.
It populates follower details from the User collection.
The lean() method improves performance by returning plain objects.
*/


/* =========================================================
   Get Users a Person is Following
   GET /api/following/:userId
   ========================================================= */
exports.getFollowing = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const following = await Follow.find({ follower: userId })
    .populate("following", "username email profilePic")
    .lean();

  res.json({
    success: true,
    count: following.length,
    data: following
  });
});

/*
This endpoint returns all users that a specific user follows.
It populates the followed user’s public profile fields.
*/