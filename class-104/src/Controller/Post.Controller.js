const Post = require("../Models/Post.model");
const imagekit = require("../config/Imagekit");
const getUserFromToken = require("../middleware/Auth");
const { toFile } = require("@imagekit/nodejs");

// ===== CREATE POST =====
const CreatePostController = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { caption } = req.body;
    if (!caption) {
      return res.status(400).json({ message: "Caption is required" });
    }

    // Upload image to ImageKit
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


// ===== GET ALL POSTS =====
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


// ===== GET MY POSTS =====
const GetMyPostsController = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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


// ===== DELETE POST =====
const DeletePostController = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Delete image from ImageKit
    if (post.img_fileId) {
      await imagekit.files.deleteFile(post.img_fileId);
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
  DeletePostController,
};
