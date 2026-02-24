// Hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../Auth.Context";

/* =========================================================
   useAuth HOOK
   - Custom React hook to access authentication context
   - Simplifies usage of AuthContext in components
   - Provides:
       user → currently authenticated user
       loading → auth initialization/loading state
       login → function to log in user
       register → function to register user
       logout → function to log out user
       isAuthenticated → boolean if user is logged in
========================================================= */
export function useAuth() {
  const context = useContext(AuthContext);

  // Safety check to ensure hook is used within AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}