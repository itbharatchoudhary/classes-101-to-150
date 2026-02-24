// ============================================
// IMPORTS
// ============================================
import axios from "axios";

// ============================================
// API BASE URL
// ============================================
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

// ============================================
// AXIOS INSTANCE
// ============================================
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ============================================
// REGISTER USER
// ============================================
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// ============================================
// LOGIN USER
// ============================================
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// ============================================
// LOGOUT USER
// ============================================
export const logoutUser = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};

// ============================================
// GET CURRENT USER (SESSION RESTORE)
// ============================================
export const getCurrentUser = async () => {
  try {
    const response = await API.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get user session" };
  }
};

// ============================================
// EXPORT
// ============================================
const AuthAPI = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};

export default AuthAPI;

/*
COMMENT:
This service handles all authentication-related API calls:
✔ registerUser → create account
✔ loginUser → authenticate
✔ logoutUser → end session
✔ getCurrentUser → restore session on page reload
Consistent error handling ensures UI can display proper messages.
*/