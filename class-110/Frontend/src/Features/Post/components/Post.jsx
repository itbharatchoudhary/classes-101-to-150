// ============================================
// IMPORTS
// ============================================
import React from "react";

/*
This component renders a single post card.
Displays:
✔ User info
✔ Post image
✔ Caption
✔ Delete action
*/


// ============================================
// POST COMPONENT
// ============================================
const Post = ({ post, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      {/* ================================
          USER INFO HEADER
          Displays profile + username + date
      ================================= */}
      <div className="flex items-center gap-3 p-4 border-b">

        <img
          src={post.user?.profile || "/default-avatar.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover border"
        />

        <div className="flex flex-col">
          <h4 className="font-semibold text-gray-800">
            {post.user?.username || "Unknown User"}
          </h4>

          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>

      </div>


      {/* ================================
          POST IMAGE SECTION
          Shows uploaded post image
      ================================= */}
      <div className="w-full bg-gray-100">
        <img
          src={post.img_url}
          alt="post"
          className="w-full max-h-125 object-cover"
        />
      </div>


      {/* ================================
          POST CONTENT SECTION
          Caption + delete action
      ================================= */}
      <div className="p-4 space-y-3">

        <p className="text-gray-800">
          {post.caption}
        </p>

        <button
          onClick={() => onDelete(post._id)}
          className="text-sm text-red-600 font-medium hover:text-red-700 transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default Post;

/*
Component Responsibility:
✔ Render post safely
✔ Prevent UI crash on missing data
✔ Keep reusable feed card structure
✔ Production-safe rendering
*/