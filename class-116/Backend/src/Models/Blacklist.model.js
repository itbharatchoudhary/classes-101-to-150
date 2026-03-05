const mongoose = require("mongoose");

/* =========================
   Blacklist Schema
   Stores invalid/blocked JWT tokens
   Used for logout and token revocation
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
      index: { expires: 0 }, // MongoDB auto deletes document after expiry time
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* =========================
   STATIC METHOD
   Check if token is blacklisted
========================= */
blacklistSchema.statics.isBlacklisted = async function (token) {
  const blacklisted = await this.findOne({ token });
  return !!blacklisted;
};

/* =========================
   MODEL EXPORT
   Represents collection: blacklists
========================= */
module.exports = mongoose.model("Blacklist", blacklistSchema);