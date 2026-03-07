const songModel = require("../Models/Song.model");
const storageService = require('../Services/Storage.service')
const id3 = require("node-id3");


/**
 * @route POST /api/songs/
 * @desc Upload a new song with metadata and optional poster image
 * @access Public
 */
async function uploadSong(req, res) {
    try {

        const songBuffer = req.file.buffer
        const { mood } = req.body;


        const tags = id3.read(songBuffer);

        const uploads = [
            storageService.uploadToImageKit({
                buffer: songBuffer,
                fileName: tags.title || "song",
                folder: "/cohort-2/modify/songs"
            })
        ];

        if (tags.image && tags.image.imageBuffer) {
            uploads.push(
                storageService.uploadToImageKit({
                    buffer: tags.image.imageBuffer,
                    fileName: (tags.title || "poster") + ".jpeg",
                    folder: "/cohort-2/modify/posters"
                })
            );
        }

        const results = await Promise.all(uploads);

        const songFile = results[0];
        const posterFile = results[1];

        const song = await songModel.create({
            title: tags.title,
            artist: tags.artist,
            album: tags.album,
            year: tags.year,
            genre: tags.genre,
            url: songFile.url,
            posterUrl: posterFile?.url,
            mood
        })

        res.json({
            success: true,
            message: "Song uploaded successfully",
            song
        })
    } catch (error) {
        console.error("Error uploading song:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload song"
        });
    }

}

/**
 * @route GET /api/songs/mood
 * @desc Get songs by mood
 * @access Public
 */

async function getSongsByMood(req, res, next) {
    try {
        const { mood } = req.query;
        /**
         *  to prevent users from sending invalid moods, we can check if the mood is in the allowedMoods array. If it's not, we can return an error response.  
         */
        const allowedMoods = ["sad", "happy", "surprised"];

        if (!allowedMoods.includes(mood)) {
            return res.status(400).json({
                success: "Invalid Mood"
            });
        }


        const songs = await songModel.aggregate([
            { $match: { mood } },
            { $sample: { size: 10 } }
        ]);

        res.json({
            success: true,
            songs
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { uploadSong, getSongsByMood };

