import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../Auth/Hooks/useAuth";
import { getAllPostsAPI, createPostAPI, deletePostAPI } from "../Post/Services/Post.api";

// ============================================
// CREATE CONTEXT
// ============================================
const PostContext = createContext();

// ============================================
// PROVIDER
// ============================================
export const PostProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH POSTS
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

  // CREATE POST
  const createPost = async (caption, imageFile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", imageFile);
      const data = await createPostAPI(formData);
      setPosts((prev) => [data.post, ...prev]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Post creation failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE POST
  const deletePost = async (postId) => {
    try {
      await deletePostAPI(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // AUTO LOAD POSTS IF AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated) fetchPosts();
  }, [isAuthenticated]);

  // CONTEXT VALUE
  const value = { posts, loading, error, fetchPosts, createPost, deletePost };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// CUSTOM HOOK
export const usePostContext = () => useContext(PostContext);

/*
COMMENT:
Provides global post management:
✔ fetchPosts → get all posts
✔ createPost → upload new post
✔ deletePost → remove post
✔ posts, loading, error → global feed state
✔ auto-fetch posts on login
*/