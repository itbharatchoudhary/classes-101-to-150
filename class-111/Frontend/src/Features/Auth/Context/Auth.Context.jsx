import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../Services/Auth.api";

/*
======================================================
AUTH CONTEXT
======================================================
Global authentication manager

Responsibilities:
- Maintains authenticated user state
- Syncs session with backend
- Provides auth functions to entire app
*/

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  ======================================================
  LOAD CURRENT USER
  ======================================================
  Called when app starts

  Flow:
  Frontend → /me endpoint
  Backend → reads cookie → finds MongoDB session
  Returns authenticated user
  */
 const fetchUser = async () => {
  try {
    const res = await getCurrentUser();
    setUser(res.user);
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUser();
  }, []);

  /*
  ======================================================
  LOGIN
  ======================================================
  Backend validates credentials using MongoDB
  Session cookie stored automatically
  */
 const login = async (formData) => {
  const res = await loginUser(formData);
  setUser(res.user); // FIXED
};
  /*
  ======================================================
  REGISTER
  ======================================================
  Creates MongoDB user
  Backend logs user in automatically
  */
 const register = async (formData) => {
  const res = await registerUser(formData);
  setUser(res.user); // FIXED
};

  /*
  ======================================================
  LOGOUT
  ======================================================
  Destroys session in backend
  */
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
======================================================
CUSTOM HOOK
======================================================
Simplifies accessing auth state inside components
*/
export const useAuth = () => useContext(AuthContext);