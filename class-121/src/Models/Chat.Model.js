import mongoose from "mongoose";

/**
 * Define schema for storing user chat sessions
 * Keeps chat ownership and basic metadata
 */
const chatSchema = new mongoose.Schema(
  {
    /**
     * Reference to the user owning the chat
     * Ensures relation with User collection
     */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Optimize queries by user
    },

    /**
     * Chat title for quick identification
     * Defaults to a generic name
     */
    title: {
      type: String,
      trim: true,
      default: "New Chat",
      maxlength: 100, // Prevent oversized input
    },
  },
  {
    timestamps: true, // Auto-manage createdAt & updatedAt
    versionKey: false, // Remove __v field
  }
);

/**
 * Add pre-save validation for safety
 * Ensures required fields integrity
 */
chatSchema.pre("save", function (next) {
  try {
    // Validate user existence
    if (!this.user) {
      return next(new Error("User reference is required"));
    }

    // Normalize title fallback
    if (!this.title || this.title.trim() === "") {
      this.title = "New Chat";
    }

    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Convert output safely before sending response
 * Removes unwanted internal fields
 */
chatSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.__v; // Remove version key if exists

  return obj;
};

/**
 * Create Chat model from schema
 * Centralized export for reuse
 */
const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;