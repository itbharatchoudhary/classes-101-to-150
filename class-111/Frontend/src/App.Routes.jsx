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
- BrowserRouter → wraps the entire app for routing
- Routes, Route → define application paths
- Navigate → programmatic redirects for authentication
- Outlet → placeholder for nested child routes
- useAuth → access global authentication state
- Page components → LoginForm, RegisterForm, Feed
*/


// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================
function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // ✅ Correct context property

  /*
  LOGIC PURPOSE:
  - If user is logged in (isAuthenticated = true), render child routes via <Outlet />
  - If not logged in, redirect to "/login"
  */
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}


// ============================================
// PUBLIC ROUTE COMPONENT
// ============================================
function PublicRoute() {
  const { isAuthenticated } = useAuth(); // ✅ Correct context property

  /*
  LOGIC PURPOSE:
  - Prevent logged-in users from accessing login/register pages
  - If user is NOT authenticated, render child routes via <Outlet />
  - If authenticated, redirect to "/feed"
  */
  return !isAuthenticated ? <Outlet /> : <Navigate to="/feed" replace />;
}


// ============================================
// APP ROUTES
// ============================================
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route "/" → redirect to feed */}
        <Route path="/" element={<Navigate to="/feed" replace />} />

        {/* PUBLIC PAGES → Login/Register */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* PROTECTED PAGES → Feed (other pages can be added) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
        </Route>

        {/* Catch-all → redirect unknown routes to "/" */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

/*
MODULE SUMMARY:
✔ Centralized routing system for the app
✔ ProtectedRoute → secures authenticated pages
✔ PublicRoute → prevents logged-in users from accessing auth pages
✔ Default redirect and 404 fallback implemented
✔ Clean, maintainable, and scalable for future pages
*/