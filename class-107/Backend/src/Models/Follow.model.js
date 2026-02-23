// ======================================================
// Follow.model.js
// ======================================================
const mongoose = require("mongoose");

/*
Follow model stores the relationship between users:
- follower: who is following
- following: who is being followed
- timestamps: track when the follow happened
*/

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
    timestamps: true, // automatically adds createdAt & updatedAt
    versionKey: false
  }
);

// Prevent duplicate follows
followSchema.index({ follower: 1, following: 1 }, { unique: true });

// Prevent self-follow
followSchema.pre("validate", function(next) {
  if (this.follower.equals(this.following)) {
    return next(new Error("User cannot follow themselves"));
  }
  // next();
});

// Static helper methods
followSchema.statics.followUser = async function(followerId, followingId) {
  return this.create({ follower: followerId, following: followingId });
};

followSchema.statics.unfollowUser = async function(followerId, followingId) {
  return this.deleteOne({ follower: followerId, following: followingId });
};

followSchema.statics.getFollowers = function(userId) {
  return this.find({ following: userId }).populate("follower", "username email profile").lean();
};

followSchema.statics.getFollowing = function(userId) {
  return this.find({ follower: userId }).populate("following", "username email profile").lean();
};

followSchema.statics.isFollowing = async function(followerId, followingId) {
  const result = await this.exists({ follower: followerId, following: followingId });
  return !!result;
};

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;

/*
This model represents the "Follow" collection in MongoDB.
It allows:
✔ Adding/removing follow relationships
✔ Fetching followers and following for a user
✔ Checking if a user follows another
*/