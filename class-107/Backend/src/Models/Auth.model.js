// ======================================================
// 1. IMPORT DEPENDENCIES
// ======================================================
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ======================================================
// 2. PROFILE SUBDOCUMENT SCHEMA
// ======================================================
const ProfileSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "https://ik.imagekit.io/Bharat/default-user-profile-icon.avif",
      trim: true,
    },
  },
  { _id: false } // Disable separate _id for subdocument
);

// ======================================================
// 3. USER SCHEMA
// ======================================================
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Hide password by default
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },
    profile: {
      type: ProfileSchema,
      default: () => ({}),
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false, // Removes __v field
  }
);

// ======================================================
// 4. INDEXES
// ======================================================
// UserSchema.index({ email: 1 }, { unique: true });
// UserSchema.index({ username: 1 }, { unique: true });

// ======================================================
// 5. PRE-SAVE HOOK: HASH PASSWORD
// ======================================================
UserSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ======================================================
// 6. INSTANCE METHOD: COMPARE PASSWORD
// ======================================================
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ======================================================
// 7. INSTANCE METHOD: TO JSON
// ======================================================
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Hide password in API responses
  return user;
};

// ======================================================
// 8. EXPORT MODEL
// ======================================================
module.exports = mongoose.model("User", UserSchema);

/*
Professional Notes:
- Password hashing happens automatically in pre-save.
- Avoid manual hashing in controllers.
- toJSON hides sensitive fields.
- Indexes enforce uniqueness.
*/