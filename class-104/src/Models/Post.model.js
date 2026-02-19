const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    img_url: {
      type: String,
      required: true,
    },
    img_fileId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
