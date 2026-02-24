// ============================================
// IMPORTS
// ============================================

import { createContext, useState, useEffect } from "react";
import AuthAPI from "../Auth/Services/Auth.api";

/*
IMPORT PURPOSE
- React hooks for global state management
- AuthAPI handles all backend authentication requests
- Keeps network logic separated from UI/state logic
*/



// ============================================
// CREATE AUTH CONTEXT
// ============================================

export const AuthContext = createContext();

/*
CONTEXT PURPOSE
- Provides global authentication state
- Allows any component to access:
  → current user
  → login / register / logout functions
  → authentication status
*/



// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

export function AuthProvider({ children }) {

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  STATE PURPOSE
  - user → stores authenticated user data globally
  - loading → indicates authentication process in progress
  - loading prevents UI flicker during session check
  */



  // ============================================
  // LOGIN FUNCTION
  // ============================================

  const handleLogin = async (identifier, password) => {
    try {
      setLoading(true);

      const response = await AuthAPI.loginUser({
        identifier,
        password,
      });

      setUser(response.user || true);
      return response;

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /*
  LOGIN PURPOSE
  - Sends credentials to backend
  - Stores authenticated user globally
  - Enables protected routes after success
  - Supports cookie-based authentication
  */



  // ============================================
  // REGISTER FUNCTION
  // ============================================

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

  /*
  REGISTER PURPOSE
  - Creates a new user account
  - Does not automatically authenticate unless backend does
  - Returns API response for UI handling
  */



  // ============================================
  // LOGOUT FUNCTION
  // ============================================

  const handleLogout = async () => {
    try {
      await AuthAPI.logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  /*
  LOGOUT PURPOSE
  - Calls backend logout endpoint
  - Clears authentication state
  - Removes access to protected routes
  */



  // ============================================
  // SESSION RESTORATION
  // ============================================

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await AuthAPI.getCurrentUser?.();

        if (response?.user) {
          setUser(response.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /*
  SESSION PURPOSE
  - Runs once when application loads
  - Restores login session from backend
  - Keeps user logged in after page refresh
  - Prevents unauthorized redirect flicker
  */



  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  /*
  VALUE PURPOSE
  - Exposes authentication state globally
  - Provides functions for auth operations
  - isAuthenticated simplifies route protection logic
  */



  // ============================================
  // PROVIDER WRAPPER
  // ============================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  /*
  PROVIDER PURPOSE
  - Wraps entire application
  - Makes authentication available everywhere
  - Enables protected routes and global access control
  */
}