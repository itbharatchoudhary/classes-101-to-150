import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./Features/Auth/Auth.Context";
// Global authentication provider that manages user state across the app


/* =========================================================
   APPLICATION ENTRY POINT
   - Renders React app into the DOM
   - Wraps application with global providers
========================================================= */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* =====================================================
       AUTH PROVIDER WRAPPER
       - Makes authentication state available globally
       - Enables login/logout access from any component
       - Required for protected routes and user persistence
    ===================================================== */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);