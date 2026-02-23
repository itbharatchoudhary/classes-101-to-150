/**
 * POST ROUTES MODULE
 * ==================
 * Handles all post-related endpoints:
 * - Create post with image upload
 * - Fetch posts
 * - Fetch user posts
 * - Fetch single post
 * - Delete post
 */

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
 * ==========================================
 * MULTER CONFIGURATION (FILE UPLOAD HANDLER)
 * ==========================================
 * Purpose:
 * - Store uploaded files temporarily in memory
 * - Restrict file size
 * - Accept only images
 * - Used for post image uploads
 */

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max size: 5MB
  },
  fileFilter,
});



/**
 * ==========================================
 * PROTECTED ROUTES
 * ==========================================
 * All routes below require authentication.
 *
 * Flow:
 * Client → authMiddleware → Controller
 *
 * If token invalid:
 *    request blocked
 *
 * If token valid:
 *    req.user available in controller
 */



/**
 * ==========================================
 * CREATE POST
 * ==========================================
 * Method: POST
 * Route: /api/posts
 *
 * Features:
 * - Auth required
 * - Accepts single image file
 * - Stores post in database
 */

router.post("/", authMiddleware, upload.single("image"), CreatePostController);


/**
 * ==========================================
 * GET ALL POSTS
 * ==========================================
 * Method: GET
 * Route: /api/posts
 *
 * Returns:
 * - List of all posts
 */

router.get("/", authMiddleware, GetAllPostsController);



/**
 * ==========================================
 * GET LOGGED-IN USER POSTS
 * ==========================================
 * Method: GET
 * Route: /api/posts/my
 *
 * Returns:
 * - Posts created by logged-in user
 */

router.get("/my", authMiddleware, GetMyPostsController);



/**
 * ==========================================
 * GET SINGLE POST (OWNER ONLY)
 * ==========================================
 * Method: GET
 * Route: /api/posts/:id
 *
 * Access:
 * - Only owner can view
 */

router.get("/:id", authMiddleware, GetSinglePostController);



/**
 * ==========================================
 * DELETE POST (OWNER ONLY)
 * ==========================================
 * Method: DELETE
 * Route: /api/posts/:id
 *
 * Access:
 * - Only owner can delete
 */

router.delete("/:id", authMiddleware, DeletePostController);



/**
 * ==========================================
 * GLOBAL MULTER ERROR HANDLER
 * ==========================================
 * Handles file upload errors gracefully
 */

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
});



/**
 * ==========================================
 * EXPORT ROUTER
 * ==========================================
 * Makes routes available to main server
 */

module.exports = router;