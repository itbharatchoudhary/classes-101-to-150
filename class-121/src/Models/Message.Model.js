import mongoose from "mongoose";

/**
 * Define schema for storing chat messages
 * Ensures structured message storage with validation
 */
const messageSchema = new mongoose.Schema(
  {
    // Reference to associated chat document
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    // Store message content with trimming
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },

    // Define sender role (user or AI)
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
  },
  {
    // Automatically manage createdAt and updatedAt
    timestamps: true,
  }
);

/**
 * Create and export Message model
 * Used for database operations on messages
 */
const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;