// ============================================
// IMPORTS
// ============================================
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllPostsAPI,
  createPostAPI,
  deletePostAPI,
} from "../Post/Services/Post.api";

/*
IMPORT PURPOSE:
- React hooks → global state and lifecycle management
- Post API service → backend communication for posts
- Centralizes all post-related operations in one place
*/


// ============================================
// CREATE CONTEXT
// ============================================
const PostContext = createContext();

/*
CONTEXT PURPOSE:
- Provides global post state and operations
- Allows any component to access:
  → posts data
  → loading status
  → error messages
  → post-related functions (fetch, create, delete)
*/


// ============================================
// PROVIDER COMPONENT
// ============================================
export const PostProvider = ({ children }) => {

  // ============================================
  // GLOBAL STATE
  // ============================================
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  STATE PURPOSE:
  - posts → stores feed data globally
  - loading → indicates ongoing API requests
  - error → stores backend error messages
  */


  // ============================================
  // AUTH CHECK
  // ============================================
  const isAuthenticated = () => {
    return document.cookie.includes("token");
  };

  /*
  AUTH PURPOSE:
  - Prevents API calls if user is not logged in
  - Ensures feed loads only for authenticated users
  */


  // ============================================
  // FETCH POSTS
  // ============================================
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPostsAPI();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  /*
  FETCH PURPOSE:
  - Retrieves all posts from backend
  - Updates global feed state
  - Handles loading and error states
  */


  // ============================================
  // CREATE POST
  // ============================================
  const createPost = async (caption, imageFile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", imageFile);

      const data = await createPostAPI(formData);

      // Optimistically update feed
      setPosts((prev) => [data.post, ...prev]);
      return data;

    } catch (err) {
      setError(err.response?.data?.message || "Post creation failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
  CREATE PURPOSE:
  - Sends new post data to backend (caption + image)
  - Updates feed immediately after creation
  - Handles loading and error states
  */


  // ============================================
  // DELETE POST
  // ============================================
  const deletePost = async (postId) => {
    try {
      await deletePostAPI(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  /*
  DELETE PURPOSE:
  - Removes post from backend
  - Updates UI immediately
  - Handles errors gracefully
  */


  // ============================================
  // AUTO LOAD POSTS ON LOGIN
  // ============================================
  useEffect(() => {
    if (isAuthenticated()) {
      fetchPosts();
    }
  }, []);

  /*
  AUTO LOAD PURPOSE:
  - Runs once on app load
  - Automatically fetches feed if user is logged in
  - Ensures feed page has data immediately
  */


  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    deletePost,
  };

  /*
  VALUE PURPOSE:
  - Exposes global post state
  - Provides reusable post operations to components
  */


  // ============================================
  // PROVIDER WRAPPER
  // ============================================
  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );

  /*
  PROVIDER PURPOSE:
  - Wraps part or all of the application
  - Makes post state and functions accessible to all children
  */
};


// ============================================
// CUSTOM HOOK
// ============================================
export const usePostContext = () => {
  return useContext(PostContext);
};

/*
HOOK PURPOSE:
- Simplifies access to PostContext
- Returns { posts, loading, error, fetchPosts, createPost, deletePost }
- Improves code readability and prevents repeated useContext imports
*/


// ============================================
// MODULE SUMMARY
// ============================================

/*
This module provides a complete post management system:
✔ Centralized global post state (posts, loading, error)
✔ Fetch, create, and delete post functions
✔ Automatically loads feed for authenticated users
✔ Reusable via usePostContext hook
✔ Keeps components clean and focused on UI
*/