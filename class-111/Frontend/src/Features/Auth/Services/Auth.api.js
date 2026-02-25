import axios from "axios";

/*
======================================================
AXIOS INSTANCE
======================================================
Central HTTP client used across auth system

- baseURL → backend auth routes
- withCredentials → sends session cookie
- Single place to configure API behavior
*/

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

/*
======================================================
AUTH REQUEST FUNCTIONS
======================================================
Each function communicates with backend
Backend is responsible for MongoDB interaction

Frontend NEVER talks to MongoDB directly
It talks to backend → backend talks to MongoDB
*/

/*
======================================================
REGISTER USER
======================================================
Creates MongoDB user
Backend returns authenticated user
*/
export const registerUser = async (data) => {
  return await API.post("/register", data);
};

/*
======================================================
LOGIN USER
======================================================
Verifies credentials in MongoDB
Backend creates session cookie
*/
export const loginUser = async (data) => {
  return await API.post("/login", data);
};

/*
======================================================
LOGOUT USER
======================================================
Destroys session in backend
Clears authentication cookie
*/
export const logoutUser = async () => {
  return await API.post("/logout");
};

/*
======================================================
GET CURRENT USER
======================================================
Reads session cookie
Backend fetches MongoDB user
Used for persistent login on refresh
*/
export const getCurrentUser = async () => {
  return await API.get("/me");
};

/*
======================================================
UPDATE PROFILE
======================================================
Updates MongoDB user data
Requires authenticated session
*/
export const updateProfile = async (data) => {
  return await API.put("/update", data);
};

/*
======================================================
CHANGE PASSWORD
======================================================
Verifies old password then updates MongoDB record
*/
export const changePassword = async (data) => {
  return await API.post("/change-password", data);
};

/*
======================================================
REQUEST PASSWORD RESET
======================================================
Backend sends reset email
Stores reset token in MongoDB
*/
export const requestPasswordReset = async (data) => {
  return await API.post("/reset-password", data);
};

/*
======================================================
RESET PASSWORD CONFIRM
======================================================
Validates reset token
Updates MongoDB password
*/
export const resetPassword = async (data) => {
  return await API.post("/reset-password/confirm", data);
};

/*
======================================================
VERIFY EMAIL
======================================================
Validates verification token
Updates MongoDB user status
*/
export const verifyEmail = async (data) => {
  return await API.post("/verify-email", data);
};