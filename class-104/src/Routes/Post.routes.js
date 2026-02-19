const express = require("express");
const multer = require("multer");

const {
  CreatePostController,
  GetAllPostsController,
  GetMyPostsController,
  GetSinglePostController,
  DeletePostController,
} = require("../Controller/Post.Controller");

const router = express.Router();


// ===== MULTER CONFIG =====
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});


// ===== ROUTES =====

// create post
router.post("/create", upload.single("image"), CreatePostController);

// get all posts (token required)
router.get("/allPost", GetAllPostsController);

// get my posts
router.get("/myposts", GetMyPostsController);

// get single post (owner only)
router.get("/single/:id", GetSinglePostController);

// delete post
router.delete("/delete/:id", DeletePostController);

module.exports = router;
