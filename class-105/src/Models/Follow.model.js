// =======================
// 1. Import Dependencies
// =======================
const mongoose = require("mongoose");


/*
This section imports Mongoose, which is used to define schemas,
validate data, and interact with MongoDB collections.
*/


// =======================
// 2. Create Follow Schema
// =======================
const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Follower is required"],
      index: true
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Following user is required"],
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);


/*
This schema defines the relationship between two users:

follower  → The user who follows someone
following → The user being followed

Key features:
✔ ObjectId references User collection
✔ Required validation
✔ Indexing for faster queries
✔ timestamps → automatically adds createdAt & updatedAt
✔ versionKey disabled for cleaner documents
*/


// =====================================
// 3️. Prevent Duplicate Follow Records
// =====================================
followSchema.index({ follower: 1, following: 1 }, { unique: true });


/*
This creates a compound unique index.

Result:
✗  A user cannot follow the same person twice
✔ Ensures database-level data integrity
✔ Improves lookup performance
*/


// =====================================
// 4. Prevent User From Following Self
// =====================================
followSchema.pre("save", function (next) {
  if (this.follower.toString() === this.following.toString()) {
    return next(new Error("User cannot follow themselves"));
  }
  next();
});


/*
This middleware runs before saving a document.

Purpose:
✔ Stops self-following
✔ Adds business logic validation
✔ Prevents bad data from entering database
*/


// =======================
// 5️. Create Model
// =======================
const Follow = mongoose.model("Follow", followSchema);


/*
Creates a MongoDB collection named "follows" (pluralized automatically).

This model provides methods like:
✔ Follow.create()
✔ Follow.find()
✔ Follow.deleteOne()
✔ Follow.countDocuments()
*/


// =======================
// 6️. Export Model
// =======================
module.exports = Follow;


/*
Exports the model so it can be used in controllers, services, and routes.
*/