// ==========================================================
// Imports & Setup
// ==========================================================
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Like = require("../Models/Like.model");
const Post = require("../Models/Post.model");

/*
This section imports required dependencies:
- mongoose → for ObjectId validation
- asyncHandler → handles async errors automatically
- Like & Post → MongoDB models
*/


// ==========================================================
// Helper: Validate MongoDB ObjectId
// ==========================================================
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/*
This helper prevents database crashes caused by invalid IDs.
Always validate IDs before querying MongoDB.
*/


// ==========================================================
// Helper: Check Post Existence
// ==========================================================
const ensurePostExists = async (postId) => {
    const post = await Post.findById(postId).select("id").lean();
    return post ? true : false;
};

/*
This helper verifies a post exists without loading full document.
.select("_id") → minimal data for performance
.lean() → faster read-only query
*/


// ==========================================================
// Add Like to a Post
// POST /api/likes
// ==========================================================
exports.addLike = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;

    // Validate ID format
    if (!isValidObjectId(postId)) {
        return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    // Check post existence
    const postExists = await ensurePostExists(postId);
    if (!postExists) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Prevent duplicate likes
    const alreadyLiked = await Like.exists({ user: userId, post: postId });
    if (alreadyLiked) {
        return res.status(409).json({ success: false, message: "Post already liked" });
    }

    // Create like
    const like = await Like.create({ user: userId, post: postId });

    return res.status(201).json({
        success: true,
        message: "Post liked successfully",
        data: like,
    });
});

/*
What this endpoint does:
1. Validates post ID
2. Confirms post exists
3. Prevents duplicate likes
4. Creates new like record
5. Returns created like
*/


// ==========================================================
// Remove Like from a Post
// DELETE /api/likes
// ==========================================================
exports.removeLike = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;

    if (!isValidObjectId(postId)) {
        return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const deletedLike = await Like.findOneAndDelete({ user: userId, post: postId });

    if (!deletedLike) {
        return res.status(404).json({ success: false, message: "Like not found" });
    }

    return res.status(200).json({
        success: true,
        message: "Like removed successfully",
    });
});

/*
What this endpoint does:
1. Validates post ID
2. Finds and deletes the user's like
3. Returns success or not found response
*/


// ==========================================================
// Get All Likes for a Post
// GET /api/likes/:postId
// ==========================================================
exports.getLikesForPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) {
        return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const postExists = await ensurePostExists(postId);
    if (!postExists) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    const likes = await Like.find({ post: postId })
        .populate("user", "username email profilePic")
        .lean();

    return res.status(200).json({
        success: true,
        totalLikes: likes.length,
        data: likes,
    });
});

/*
What this endpoint does:
1. Validates post ID
2. Confirms post exists
3. Fetches all likes for the post
4. Populates basic user info
5. Returns count + list
*/


// ==========================================================
// Toggle Like (Like / Unlike in One Request)
// POST /api/likes/toggle
// ==========================================================
exports.toggleLike = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.body;

    if (!isValidObjectId(postId)) {
        return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const postExists = await ensurePostExists(postId);
    if (!postExists) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    const existingLike = await Like.findOne({ user: userId, post: postId });

    // Unlike
    if (existingLike) {
        await existingLike.deleteOne();
        return res.status(200).json({
            success: true,
            liked: false,
            message: "Post unliked successfully",
        });
    }

    // Like
    const like = await Like.create({ user: userId, post: postId });

    return res.status(201).json({
        success: true,
        liked: true,
        message: "Post liked successfully",
        data: like,
    });
});

/*
What this endpoint does:
1. Validates post ID
2. Confirms post exists
3. Checks if like already exists
4. If exists → remove like
5. If not → create like
6. Returns current like state
*/