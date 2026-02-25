import axios from "axios";

/*
======================================================
AXIOS INSTANCE
======================================================
Handles communication with backend auth API
Automatically sends JWT cookie
*/

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/*
======================================================
GLOBAL ERROR HANDLER
======================================================
Normalizes backend error messages
*/
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Request failed";
    return Promise.reject({ message });
  }
);

/*
======================================================
AUTH API CALLS
======================================================
Frontend → Backend → MongoDB
*/

export const registerUser = async (data) => {
  const res = await API.post("/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await API.get("/me");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/update", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await API.post("/change-password", data);
  return res.data;
};

export const requestPasswordReset = async (data) => {
  const res = await API.post("/reset-password", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await API.post("/reset-password/confirm", data);
  return res.data;
};

export const verifyEmail = async (data) => {
  const res = await API.post("/verify-email", data);
  return res.data;
};

/*
WHAT THIS FILE DOES
✔ Centralizes all backend communication
✔ Sends authentication cookies automatically
✔ Returns clean API responses
✔ Provides reusable auth functions
*/