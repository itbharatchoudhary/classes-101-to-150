// ============================================
// IMPORTS
// ============================================
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Features/Auth/Hooks/useAuth";
import LoginForm from "./Features/Auth/pages/LoginForm";
import RegisterForm from "./Features/Auth/pages/RegisterForm";
import Feed from "./Features/Post/Pages/Feed";

/*
IMPORT PURPOSE:
- BrowserRouter, Routes, Route, Navigate, Outlet → React Router v6 tools for navigation
- useAuth → access authentication state for protected/public routes
- LoginForm, RegisterForm, Feed → page components for routing
*/


// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================
function ProtectedRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

/*
PROTECTED ROUTE PURPOSE:
- Ensures only authenticated users can access child routes
- Redirects unauthenticated users to /login
- Uses Outlet to render nested routes
*/


// ============================================
// PUBLIC ROUTE COMPONENT
// ============================================
function PublicRoute() {
  const { isAuth } = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/feed" replace />;
}

/*
PUBLIC ROUTE PURPOSE:
- Prevents logged-in users from visiting login/register pages
- Redirects authenticated users to /feed
- Uses Outlet for nested route rendering
*/


// ============================================
// CENTRAL ROUTING CONFIGURATION
// ============================================
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default redirect to feed */}
        <Route path="/" element={<Navigate to="/feed" replace />} />

        {/* Public pages (login, register) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* Protected pages (feed) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

/*
ROUTING PURPOSE:
✔ Provides centralized navigation system
✔ Handles authentication-based access control
✔ Uses ProtectedRoute/PublicRoute for security and user experience
✔ Scalable structure for adding new pages/routes
*/


// ============================================
// MODULE SUMMARY
// ============================================

/*
This module defines all application routes:
✔ /login and /register → public routes accessible only to unauthenticated users
✔ /feed → protected route for authenticated users only
✔ Default "/" → redirects to /feed
✔ Clean separation between public and protected routing logic
✔ Ensures security and UX by redirecting users based on authentication state
*/