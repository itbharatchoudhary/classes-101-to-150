const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        default: "https://ik.imagekit.io/Bharat/default-user-profile-icon.avif"
    }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    Profile: {
        type: ProfileSchema,
        default: () => ({})
    }
}, { timestamps: true });

module.exports = mongoose.model("User",UserSchema);