const songModel = require("../Models/Song.model");
const storageService = require('../Services/Storage.service')
const id3 = require("node-id3");


async function uploadSong(req, res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body;


    const tags = id3.read(songBuffer);

    const songFile = await storageService.uploadToImageKit({
        buffer: songBuffer,
        fileName: tags.title || "song",
        folder: "/cohort-2/modify/songs"
    })

    let posterFile = null;

    if (tags.image && tags.image.imageBuffer) {
        posterFile = await storageService.uploadToImageKit({
            buffer: tags.image.imageBuffer,
            fileName: (tags.title || "poster") + ".jpeg",
            folder: "/cohort-2/modify/posters"
        })
    }

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

}

module.exports = { uploadSong };

