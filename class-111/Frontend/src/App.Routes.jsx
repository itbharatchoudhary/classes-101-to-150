import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Features/Auth/pages/LoginForm";
import RegisterForm from "./Features/Auth/pages/RegisterForm";
import { useAuth } from "./Features/Auth/Context/Auth.Context";
import Main from "./Features/Shared/Main";

/*
======================================================
PROTECTED ROUTE
======================================================
Allows access only if authenticated
Authentication determined by backend session
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
Prevents logged-in users from visiting auth pages
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
Application navigation structure
*/
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

/*
WHAT THIS FILE DOES
✔ Protects private pages
✔ Redirects unauthorized users
✔ Manages app navigation securely
*/