// ============================================
// IMPORTS
// ============================================

import axios from "axios";

/*
IMPORT PURPOSE:
- axios → handles HTTP communication with backend
- centralizes network logic for authentication
*/


// ============================================
// API BASE URL RESOLUTION
// ============================================

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

/*
BASE URL PURPOSE:
- Uses environment variable if provided
- Falls back to local backend during development
- Supports both production and development environments
*/


// ============================================
// AXIOS INSTANCE CONFIGURATION
// ============================================

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
AXIOS INSTANCE PURPOSE:
- Central configuration for auth-related requests
- Automatically sends authentication cookies
- Ensures JSON request format
- Keeps network configuration consistent across app
*/


// ============================================
// REGISTER USER API
// ============================================

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    // Throws backend error if available, otherwise default message
    throw error.response?.data || { message: "Registration failed" };
  }
};

/*
REGISTER PURPOSE:
- Sends user registration data to backend
- Backend creates account and may set authentication cookie
- Returns server response for UI consumption
*/


// ============================================
// LOGIN USER API
// ============================================

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

/*
LOGIN PURPOSE:
- Sends login credentials to backend
- Backend validates credentials and sets authentication cookie
- Returns authentication response for UI and context management
*/


// ============================================
// LOGOUT USER API
// ============================================

export const logoutUser = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};

/*
LOGOUT PURPOSE:
- Calls backend logout endpoint
- Backend clears authentication cookie
- Ends user session on frontend and backend
*/


// ============================================
// AUTH SERVICE EXPORT
// ============================================

const AuthAPI = {
  registerUser,
  loginUser,
  logoutUser,
};

export default AuthAPI;

/*
EXPORT PURPOSE / SERVICE RESPONSIBILITIES:
✔ Provides a single access point for all authentication-related API calls
✔ Simplifies imports across the application
✔ Keeps service architecture clean, maintainable, and scalable
✔ Ensures consistent error handling for authentication requests
*/