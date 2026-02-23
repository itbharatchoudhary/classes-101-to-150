// =========================
// IMPORT DEPENDENCIES
// =========================
const mongoose = require("mongoose");

/*
This section imports Mongoose, which is used to define
schemas and interact with MongoDB in an organized way.
*/


// =========================
// DEFINE POST SCHEMA
// =========================
const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, "Caption is required"],
      trim: true,
      maxlength: [500, "Caption cannot exceed 500 characters"],
    },

    img_url: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    img_fileId: {
      type: String,
      required: [true, "Image file ID is required"],
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false, // Removes __v field for cleaner documents
  }
);

/*
This section defines the structure of a Post document.

Fields:
- caption → text description of the post
- img_url → URL where the image is stored
- img_fileId → storage provider file identifier
- user → reference to the User who created the post

Options:
- timestamps → auto track creation & update time
- versionKey false → removes unnecessary version field
*/


// =========================
// ADD INDEXES FOR PERFORMANCE
// =========================
PostSchema.index({ createdAt: -1 });

/*
This creates a database index to speed up queries
when fetching posts sorted by newest first.
Very useful for feeds or timelines.
*/


// =========================
// EXPORT MODEL
// =========================
module.exports = mongoose.model("Post", PostSchema);

/*
This exports the Post model so it can be used in
controllers, services, and routes to create,
read, update, and delete posts in MongoDB.
*/