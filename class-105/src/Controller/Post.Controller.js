const Post = require("../Models/Post.model");
const imagekit = require("../config/Imagekit");
const { toFile } = require("@imagekit/nodejs");
const mongoose = require("mongoose");


/**
 * CREATE POST
 * ----------------
 * - Requires authenticated user (req.user from middleware)
 * - Uploads image to ImageKit
 * - Stores post in database
 */
const CreatePostController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { caption } = req.body;
    if (!caption) {
      return res.status(400).json({ message: "Caption is required" });
    }

    const uploadResponse = await imagekit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "posts-class-104",
    });

    const newPost = await Post.create({
      caption,
      img_url: uploadResponse.url,
      img_fileId: uploadResponse.fileId,
      user: userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * GET ALL POSTS
 * ----------------
 * - Returns all posts
 * - Requires authentication
 */
const GetAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email profile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All posts fetched",
      posts,
    });

  } catch (error) {
    console.error("GET ALL POSTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * GET MY POSTS
 * ----------------
 * - Returns posts created by logged-in user
 */
const GetMyPostsController = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ user: userId })
      .populate("user", "username email profile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "My posts fetched",
      posts,
    });

  } catch (error) {
    console.error("GET MY POSTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * GET SINGLE POST (OWNER ONLY)
 * ----------------
 * - User can view only their own post
 */
const GetSinglePostController = async (req, res) => {
  try {
    const userId = req.user.id;

    const post = await Post.findById(req.params.id)
      .populate("user", "username email profile");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user._id.toString() !== userId) {
      return res.status(403).json({
        message: "You can only view your own post",
      });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      post,
    });

  } catch (error) {
    console.error("GET SINGLE POST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * DELETE POST
 * ----------------
 * - Only owner can delete post
 * - Removes image from ImageKit
 * - Deletes post from database
 */
const DeletePostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (post.img_fileId) {
      await imagekit.files.delete(post.img_fileId);
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  CreatePostController,
  GetAllPostsController,
  GetMyPostsController,
  GetSinglePostController,
  DeletePostController,
};