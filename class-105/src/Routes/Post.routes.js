const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/Auth.middleware");

const {
  CreatePostController,
  GetAllPostsController,
  GetMyPostsController,
  GetSinglePostController,
  DeletePostController,
} = require("../Controller/Post.Controller");

const router = express.Router();


/**
 * MULTER CONFIGURATION
 * ---------------------
 * - Stores uploaded file in memory (buffer)
 * - Limits file size to 5MB
 * - Allows only image files
 */
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});


/**
 * POST ROUTES (PROTECTED)
 * -----------------------
 * authMiddleware runs BEFORE controller
 * If token invalid → request blocked
 * If valid → req.user available inside controller
 */


// CREATE POST
// Uploads image + creates database record
router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  CreatePostController
);


// GET ALL POSTS
// Returns all posts in system
router.get(
  "/allPost",
  authMiddleware,
  GetAllPostsController
);


// GET LOGGED-IN USER POSTS
router.get(
  "/myposts",
  authMiddleware,
  GetMyPostsController
);


// GET SINGLE POST (OWNER ONLY)
router.get(
  "/single/:id",
  authMiddleware,
  GetSinglePostController
);


// DELETE POST (OWNER ONLY)
router.delete(
  "/delete/:id",
  authMiddleware,
  DeletePostController
);


module.exports = router;