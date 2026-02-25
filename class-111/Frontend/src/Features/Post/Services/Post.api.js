// ============================================
// IMPORTS
// ============================================
import axios from "axios";

/*
IMPORT PURPOSE:
- axios → handles HTTP requests to backend
- Centralizes API communication for all post-related endpoints
*/


// ============================================
// AXIOS INSTANCE CONFIGURATION
// ============================================
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

/*
INSTANCE PURPOSE:
- Sets base backend URL for all requests
- Automatically sends authentication cookies
- Ensures consistent request configuration across the app
*/


// ============================================
// CREATE POST API
// ============================================
export const createPostAPI = async (formData) => {
  const response = await API.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/*
CREATE POST PURPOSE:
- Sends new post data (caption + image) to backend
- Supports file upload using FormData
- Backend expects:
  → image file
  → caption text
- Returns created post data for UI update
*/


// ============================================
// GET ALL POSTS API
// ============================================
export const getAllPostsAPI = async () => {
  const response = await API.get("/posts");
  return response.data;
};

/*
FETCH ALL POSTS PURPOSE:
- Retrieves all feed posts from backend
- Expected response structure:
  {
    success: boolean,
    count: number,
    posts: array
  }
- Used to populate main feed
*/


// ============================================
// GET MY POSTS API
// ============================================
export const getMyPostsAPI = async () => {
  const response = await API.get("/posts/my");
  return response.data;
};

/*
FETCH USER POSTS PURPOSE:
- Retrieves posts created by the logged-in user
- Used for profile or personal feed views
- Ensures only authenticated user's posts are returned
*/


// ============================================
// DELETE POST API
// ============================================
export const deletePostAPI = async (postId) => {
  const response = await API.delete(`/posts/${postId}`);
  return response.data;
};

/*
DELETE POST PURPOSE:
- Deletes a post by ID on the backend
- Only authorized post owner can perform deletion
- Updates frontend feed via hook after deletion
*/


// ============================================
// POST SERVICE SUMMARY
// ============================================

/*
This module provides all post-related API communication:
✔ createPostAPI → creates new posts with image and caption
✔ getAllPostsAPI → fetches all posts for main feed
✔ getMyPostsAPI → fetches posts of logged-in user
✔ deletePostAPI → deletes a post by ID
- Ensures consistent axios configuration and error handling
- Centralizes backend communication for post features
*/