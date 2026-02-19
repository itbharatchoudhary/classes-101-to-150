const express = require("express");
const multer = require("multer");

const {
  CreatePostController,
  GetAllPostsController,
  GetMyPostsController,
  DeletePostController,
} = require("../Controller/Post.Controller");

const router = express.Router();

// Multer config
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

router.post("/create", upload.single("image"), CreatePostController);
router.get("/all", GetAllPostsController);
router.get("/my", GetMyPostsController);
router.delete("/delete/:id", DeletePostController);

module.exports = router;
