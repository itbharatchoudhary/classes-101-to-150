import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "AI"],
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;