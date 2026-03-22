import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * User schema definition with validation and security fields
 */
const userSchema = new mongoose.Schema(
  {
    // Stores unique username for identification
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    // Stores unique email in lowercase format
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Stores hashed password (excluded from queries)
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // Indicates whether user email is verified
    verified: {
      type: Boolean,
      default: false,
    },

    // Stores email verification token
    verificationToken: {
      type: String,
    },

    // Stores token expiration timestamp
    verificationTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

/**
 * Hash password before saving user
 * Ensures password is encrypted securely
 */
userSchema.pre("save", async function (next) {
  try {
    // Skip hashing if password unchanged
    if (!this.isModified("password")) return next();

    const SALT_ROUNDS = 10;

    // Hash password using bcrypt
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare input password with stored hash
 * @param {string} candidatePassword - Plain password input
 * @returns {Promise<boolean>} - Match result
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Compare hashed password securely
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

/**
 * Create and export User model
 */
const UserModel = mongoose.model("User", userSchema);

export default UserModel;