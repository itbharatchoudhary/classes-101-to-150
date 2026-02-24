// ============================================
// IMPORTS
// ============================================
import { useState, useEffect } from "react";
import {
  createPostAPI,
  getAllPostsAPI,
  deletePostAPI,
} from "../Services/Post.api";

/*
IMPORT PURPOSE:
- useState, useEffect → manage local state and lifecycle effects
- createPostAPI, getAllPostsAPI, deletePostAPI → backend API calls for posts
*/


// ============================================
// CUSTOM HOOK: usePost
// ============================================
export const usePost = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  STATE PURPOSE:
  ✔ posts → stores feed data
  ✔ loading → controls UI loader and disables actions during API calls
  ✔ error → holds error messages from API or validation
  */


  // ============================================
  // FETCH ALL POSTS
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
  - Updates posts state
  - Handles loading and errors
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

      // Prepend new post to feed
      setPosts((prev) => [data.post, ...prev]);

      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
  CREATE PURPOSE:
  - Sends new post data (caption + image) to backend
  - Updates posts state with the newly created post
  - Handles loading and error states
  */


  // ============================================
  // DELETE POST
  // ============================================
  const deletePost = async (postId) => {
    try {
      await deletePostAPI(postId);

      // Remove deleted post from state
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  /*
  DELETE PURPOSE:
  - Calls backend to delete post by ID
  - Updates posts state by removing deleted post
  - Handles errors gracefully
  */


  // ============================================
  // AUTO LOAD POSTS ON COMPONENT MOUNT
  // ============================================
  useEffect(() => {
    fetchPosts();
  }, []);

  /*
  AUTO LOAD PURPOSE:
  - Automatically fetch posts when hook is first used
  - Populates feed without requiring manual fetch
  */


  // ============================================
  // RETURN HOOK DATA
  // ============================================
  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    deletePost,
  };
};

/*
HOOK RESPONSIBILITIES / SUMMARY:
✔ Connects frontend UI with backend post APIs
✔ Manages posts, loading, and error states
✔ Provides reusable functions: fetchPosts, createPost, deletePost
✔ Automatically loads posts on component mount
✔ Keeps consuming components clean and focused on UI
*/