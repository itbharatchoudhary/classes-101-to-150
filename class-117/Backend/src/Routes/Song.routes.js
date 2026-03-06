const express = require("express");
const upload = require("../Middleware/Upload.middleware");
const SongController = require("../Controllers/Song.controller")

const router = express.Router();

/**
 * POST /api/songs/
 */
router.post("/", upload.single("song"),SongController.uploadSong)
router.get("/",SongController.getAllSongs)

module.exports = router