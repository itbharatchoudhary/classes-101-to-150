const mongoose = require("mongoose");

/* =========================
   Blacklist Schema
   Stores invalidated JWT tokens
========================= */
const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // auto delete when expired (TTL index)
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Blacklist", blacklistSchema);