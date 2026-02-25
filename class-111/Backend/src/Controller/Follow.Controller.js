// ======================================================
// Follow.controller.js
// ======================================================
const mongoose = require("mongoose");
const User = require("../Models/Auth.model");
const Follow = require("../Models/Follow.model");

// ======================================================
// Helper to validate ObjectId
// ======================================================
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ======================================================
// Follow a user
// ======================================================
exports.followUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const myId = req.user.id;
    const targetUserId = req.params.userId;

    if (!isValidObjectId(targetUserId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    if (myId === targetUserId) {
      return res.status(400).json({ success: false, message: "Cannot follow yourself" });
    }

    const me = await User.findById(myId).session(session);
    const targetUser = await User.findById(targetUserId).session(session);

    if (!me || !targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const alreadyFollowing = await Follow.isFollowing(myId, targetUserId);
    if (alreadyFollowing) {
      return res.status(409).json({ success: false, message: "Already following this user" });
    }

    await Follow.followUser(myId, targetUserId);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "User followed successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/*
✔ Adds a follow relationship in "Follow" collection
✔ Uses transactions for safety
*/

// ======================================================
// Unfollow a user
// ======================================================
exports.unfollowUser = async (req, res, next) => {
  try {
    const myId = req.user.id;
    const targetUserId = req.params.userId;

    if (!isValidObjectId(targetUserId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    await Follow.unfollowUser(myId, targetUserId);

    res.status(200).json({ success: true, message: "User unfollowed successfully" });
  } catch (error) {
    next(error);
  }
};

/*
✔ Removes follow relationship
✔ Safe to call even if the user was not following
*/

// ======================================================
// Get followers
// ======================================================
exports.getFollowers = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const followers = await Follow.getFollowers(userId);
    res.status(200).json({ success: true, followers, total: followers.length });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// Get following
// ======================================================
exports.getFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const following = await Follow.getFollowing(userId);
    res.status(200).json({ success: true, following, total: following.length });
  } catch (error) {
    next(error);
  }
};