// =============================
// IMPORTS
// =============================
const mongoose = require("mongoose");
const Post = require("../Models/Post.model");
const imagekit = require("../config/Imagekit");
const { toFile } = require("@imagekit/nodejs");


// =============================
// HELPER: Error Response
// =============================
/*
 Centralized error response helper.
 Keeps responses consistent across controllers.
*/
const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};


// =============================
// CREATE POST
// =============================
/*
 What this controller does:
 1. Ensures user is authenticated
 2. Validates image + caption
 3. Uploads image to ImageKit
 4. Saves post in MongoDB
*/
const CreatePostController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendError(res, 401, "Unauthorized");
    }

    if (!req.file) {
      return sendError(res, 400, "Image file is required");
    }

    const { caption } = req.body;
    if (!caption || caption.trim() === "") {
      return sendError(res, 400, "Caption is required");
    }

    // Upload image to ImageKit
    const uploadResponse = await imagekit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "posts-class-104",
    });

    // Save post in database
    const newPost = await Post.create({
      caption: caption.trim(),
      img_url: uploadResponse.url,
      img_fileId: uploadResponse.fileId,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return sendError(res, 500, "Server error");
  }
};


// =============================
// GET ALL POSTS
// =============================
/*
 What this controller does:
 1. Fetches all posts from database
 2. Populates user info
 3. Returns newest posts first
*/
const GetAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email profile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (error) {
    console.error("GET ALL POSTS ERROR:", error);
    return sendError(res, 500, "Server error");
  }
};


// =============================
// GET MY POSTS
// =============================
/*
 What this controller does:
 1. Gets logged-in user's ID
 2. Fetches only posts created by that user
*/
const GetMyPostsController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendError(res, 401, "Unauthorized");
    }

    const posts = await Post.find({ user: userId })
      .populate("user", "username email profile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (error) {
    console.error("GET MY POSTS ERROR:", error);
    return sendError(res, 500, "Server error");
  }
};


// =============================
// GET SINGLE POST (OWNER ONLY)
// =============================
/*
 What this controller does:
 1. Validates post ID
 2. Finds post by ID
 3. Ensures logged-in user is owner
*/
const GetSinglePostController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return sendError(res, 400, "Invalid Post ID");
    }

    const post = await Post.findById(postId)
      .populate("user", "username email profile");

    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    if (post.user._id.toString() !== userId) {
      return sendError(res, 403, "You can only view your own post");
    }

    return res.status(200).json({
      success: true,
      post,
    });

  } catch (error) {
    console.error("GET SINGLE POST ERROR:", error);
    return sendError(res, 500, "Server error");
  }
};


// =============================
// DELETE POST
// =============================
/*
 What this controller does:
 1. Validates post ID
 2. Checks ownership
 3. Deletes image from ImageKit
 4. Removes post from database
*/
const DeletePostController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return sendError(res, 400, "Invalid Post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    if (post.user.toString() !== userId) {
      return sendError(res, 403, "Forbidden");
    }

    // Delete image from ImageKit if exists
    if (post.img_fileId) {
      await imagekit.files.delete(post.img_fileId);
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    return sendError(res, 500, "Server error");
  }
};


// =============================
// EXPORT CONTROLLERS
// =============================
module.exports = {
  CreatePostController,
  GetAllPostsController,
  GetMyPostsController,
  GetSinglePostController,
  DeletePostController,
};