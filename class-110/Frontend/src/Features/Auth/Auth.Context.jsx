import { createContext, useState, useEffect } from "react";
import AuthAPI from "../Auth/Services/Auth.api";

// ============================================
// CREATE CONTEXT
// ============================================
export const AuthContext = createContext();

// ============================================
// PROVIDER
// ============================================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const handleLogin = async (identifier, password) => {
    try {
      setLoading(true);
      const response = await AuthAPI.loginUser({ identifier, password });
      setUser(response.user || true);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      const response = await AuthAPI.registerUser(userData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      await AuthAPI.logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // SESSION RESTORATION
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await AuthAPI.getCurrentUser();
        if (response?.user) setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  // CONTEXT VALUE
  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*
COMMENT:
Provides global authentication state:
✔ user → current user object
✔ login/register/logout functions
✔ session restoration on app load
✔ isAuthenticated for route protection
*/