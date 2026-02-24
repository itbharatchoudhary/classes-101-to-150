import { createContext, useState, useEffect } from "react";
import AuthAPI from "../Auth/Services/Auth.api";
// Central authentication service that communicates with backend


/* =========================================================
   CREATE AUTH CONTEXT
   - Provides authentication state globally
   - Allows any component to access user + auth functions
========================================================= */
export const AuthContext = createContext();


/* =========================================================
   AUTH PROVIDER COMPONENT
   - Wraps application
   - Manages authentication state
   - Exposes login, register, logout functions
========================================================= */
export function AuthProvider({ children }) {

  /* =========================================================
     STATE MANAGEMENT
     - user → stores authenticated user data
     - loading → indicates auth check in progress
  ========================================================= */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  /* =========================================================
     LOGIN FUNCTION
     - Calls API login
     - Stores authenticated user
  ========================================================= */
  const handleLogin = async (identifier, password) => {
    try {
      setLoading(true);

      const response = await AuthAPI.loginUser({
        identifier,
        password,
      });

      setUser(response.user);
      return response;

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     REGISTER FUNCTION
     - Creates new user
     - Does NOT auto-login unless backend sends cookie
  ========================================================= */
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


  /* =========================================================
     LOGOUT FUNCTION
     - Calls backend logout endpoint
     - Clears user state
  ========================================================= */
  const handleLogout = async () => {
    try {
      await AuthAPI.logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };


  /* =========================================================
     AUTH INITIALIZATION CHECK
     - Runs once when app loads
     - If cookie exists and backend supports session check,
       user can be restored here
     - Currently just stops loading state
  ========================================================= */
  useEffect(() => {
    setLoading(false);
  }, []);


  /* =========================================================
     CONTEXT VALUE
     - Exposes auth state and functions to entire app
  ========================================================= */
  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
  };


  /* =========================================================
     PROVIDER WRAPPER
     - Makes auth state available to all children components
  ========================================================= */
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}