// ============================================
// IMPORTS
// ============================================

import React, { useState } from "react";
import { usePostContext } from "../Post.Context";
import Post from "../components/Post";

/*
IMPORT PURPOSE
- React + useState → local UI state management
- usePostContext → provides global post state and actions
- Post component → renders individual post UI
*/



// ============================================
// FEED PAGE COMPONENT
// ============================================

const Feed = () => {

  const { posts, loading, error, createPost, deletePost } = usePostContext();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  /*
  STATE PURPOSE
  - caption → stores post text input
  - image → stores selected image file

  CONTEXT PURPOSE
  - posts → global feed data
  - loading → API request state
  - error → backend error message
  - createPost → uploads new post
  - deletePost → removes post
  */



  // ============================================
  // HANDLE CREATE POST
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !image) {
      alert("Caption and image required");
      return;
    }

    await createPost(caption, image);

    setCaption("");
    setImage(null);
  };

  /*
  SUBMISSION PURPOSE
  - Prevents default form reload
  - Validates required fields
  - Sends data to backend
  - Resets form after success
  */



  // ============================================
  // RENDER COMPONENT UI
  // ============================================

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-2xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Post Feed
        </h2>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              placeholder="Write caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-600"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Post
            </button>

          </form>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mb-4">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-4">
            {error}
          </p>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onDelete={deletePost}
            />
          ))}
        </div>

      </div>
    </div>
  );

  /*
  UI PURPOSE
  - Displays post creation form
  - Shows loading and error states
  - Renders feed posts
  - Connects UI to global post state
  */
};

export default Feed;



/*
COMPONENT RESPONSIBILITIES
✔ Provides post creation interface
✔ Displays feed data
✔ Connects to backend via context
✔ Handles loading and error states
✔ Uses clean Tailwind layout
*/