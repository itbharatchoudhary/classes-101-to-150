// ======================================================
// IMPORT DEPENDENCIES
// ======================================================
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// ======================================================
// PROFILE SUBDOCUMENT
// ======================================================
const ProfileSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "https://ik.imagekit.io/Bharat/default-user-profile-icon.avif",
      trim: true,
    },
  },
  { _id: false }
);

// ======================================================
// USER SCHEMA
// ======================================================
const UserSchema = new mongoose.Schema(
  {
    // ================= BASIC USER INFO =================
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Hidden by default from queries
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

    // ================= EMAIL VERIFICATION =================
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // ================= PASSWORD RESET =================
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    versionKey: false,
  }
);

// ======================================================
// PASSWORD HASHING BEFORE SAVE
// ======================================================
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/*
This hook ensures:
- Password is NEVER stored as plain text
- Hashing only happens when password changes
*/


// ======================================================
// PASSWORD COMPARISON METHOD
// ======================================================
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/*
Used during login & password change
Safely compares raw password with hashed password
*/


// ======================================================
// GENERATE PASSWORD RESET TOKEN
// ======================================================
UserSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return token;
};

/*
Creates secure reset token:
- Raw token → send via email
- Hashed token → stored in DB
- Prevents token theft misuse
*/


// ======================================================
// GENERATE EMAIL VERIFICATION TOKEN
// ======================================================
UserSchema.methods.createEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

  return token;
};

/*
Used when verifying user's email address
Token expires after 24 hours
*/


// ======================================================
// REMOVE SENSITIVE DATA FROM API RESPONSE
// ======================================================
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  delete obj.emailVerificationToken;
  delete obj.emailVerificationExpires;

  return obj;
};

/*
Ensures API NEVER exposes:
- Password
- Reset tokens
- Verification tokens
*/


// ======================================================
// EXPORT MODEL
// ======================================================
module.exports = mongoose.model("User", UserSchema);

/*
FILE RESPONSIBILITY
✔ Defines database schema
✔ Secures password storage
✔ Generates secure tokens
✔ Protects sensitive fields
✔ Production-ready structure
*/