// src/models/User.Model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// 🔹 Pre-save hook (Mongoose 9+ async-safe, no next)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // password not changed → skip

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔹 Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// 🔹 Export model
const UserModel = mongoose.model("User", userSchema);
export default UserModel;