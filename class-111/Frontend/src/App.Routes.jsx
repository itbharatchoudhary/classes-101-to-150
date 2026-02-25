import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Features/Auth/pages/LoginForm";
import RegisterForm from "./Features/Auth/pages/RegisterForm";
import { useAuth } from "./Features/Auth/Context/Auth.Context";

/*
======================================================
PROTECTED ROUTE
======================================================
Blocks access if user not authenticated
*/
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

/*
======================================================
PUBLIC ROUTE
======================================================
Redirects logged-in users away from auth pages
*/
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  return !isAuthenticated ? children : <Navigate to="/" />;
}

/*
======================================================
APP ROUTES
======================================================
Main navigation configuration
*/
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute>Dashboard</PrivateRoute>}
        />

        <Route
          path="/login"
          element={<PublicRoute><LoginForm /></PublicRoute>}
        />

        <Route
          path="/register"
          element={<PublicRoute><RegisterForm /></PublicRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}