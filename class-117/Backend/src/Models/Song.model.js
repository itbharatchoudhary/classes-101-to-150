const mongoose = require('mongoose');


/**
 * Song Schema
 * url: String (required)
 * posterUrl: String    
 * title: String (required)
 * artist: String
 * album: String
 * year: String
 * genre: String
 * mood: String (enum: ["sad", "happy", "surprised"], required)
 */
const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },

    artist: { type: String },
    album: { type: String },
    year: { type: String },
    genre: { type: String },

    mood: {
        type: String,
        enum: ["sad", "happy", "surprised"],
        required: true
    }
});

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel