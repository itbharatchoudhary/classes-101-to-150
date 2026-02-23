/**
 * Like.model.js
 * ---------------------------------------
 * Mongoose model for storing post likes.
 * Each document represents ONE user liking ONE post.
 * A compound unique index prevents duplicate likes.
 */

const mongoose = require("mongoose");


// =====================================================
// 1️⃣ Schema Definition
// =====================================================
// Defines the structure of Like documents in MongoDB.
// Each like connects a user and a post.
const LikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Improves query performance when filtering by user
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true, // Improves query performance when filtering by post
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false, // Removes __v field for cleaner documents
  }
);


// =====================================================
// 2️⃣ Compound Unique Index
// =====================================================
// Ensures a user cannot like the same post more than once.
// MongoDB enforces uniqueness at the database level.
LikeSchema.index({ user: 1, post: 1 }, { unique: true });


// =====================================================
// 3️⃣ Static Helper Methods
// =====================================================
// Professional practice: attach reusable DB logic
// directly to the model for cleaner controllers.

/**
 * Check if a user already liked a post
 */
LikeSchema.statics.hasUserLikedPost = async function (userId, postId) {
  return await this.exists({ user: userId, post: postId });
};

/**
 * Remove a like (unlike a post)
 */
LikeSchema.statics.removeLike = async function (userId, postId) {
  return await this.findOneAndDelete({ user: userId, post: postId });
};

/**
 * Count total likes for a post
 */
LikeSchema.statics.countPostLikes = async function (postId) {
  return await this.countDocuments({ post: postId });
};


// =====================================================
// 4️⃣ Model Export
// =====================================================
// Creates and exports the Like model so it can be used
// in controllers, services, and routes.
module.exports = mongoose.model("Like", LikeSchema);