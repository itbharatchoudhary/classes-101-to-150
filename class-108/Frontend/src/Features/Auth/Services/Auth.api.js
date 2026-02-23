// ===================== IMPORTS =====================
import axios from "axios";

/* =========================================================
   API BASE URL RESOLUTION
   - Uses Vite environment variable if available
   - Falls back to local backend URL
   - Works in development and production
========================================================= */
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

/* =========================================================
   AXIOS INSTANCE CONFIGURATION
   - Central place for all auth HTTP requests
   - withCredentials → enables cookie-based authentication
   - headers → ensures JSON communication
========================================================= */
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   REGISTER USER
   - Sends user data to backend
   - Backend creates user and sets JWT cookie
   - Returns server response
========================================================= */
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

/* =========================================================
   LOGIN USER
   - Sends identifier + password
   - Backend validates credentials
   - JWT stored automatically in httpOnly cookie
========================================================= */
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

/* =========================================================
   LOGOUT USER
   - Calls protected logout endpoint
   - Backend clears authentication cookie
========================================================= */
export const logoutUser = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};

/* =========================================================
   AUTH SERVICE EXPORT
   - Provides single import point for auth actions
   - Cleaner usage inside components
========================================================= */
const AuthAPI = {
  registerUser,
  loginUser,
  logoutUser,
};

export default AuthAPI;