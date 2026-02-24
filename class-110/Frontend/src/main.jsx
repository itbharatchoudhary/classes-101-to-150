// ============================================
// IMPORTS
// ============================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./Features/Auth/Auth.Context";
import { PostProvider } from "./Features/Post/Post.Context";

/*
IMPORT GROUP PURPOSE:
- React core rendering tools → StrictMode, createRoot
- Global stylesheet → index.css
- Root application component → App
- Global state providers → AuthProvider, PostProvider
- Ensures application has access to authentication & post context globally
*/


// ============================================
// ROOT DOM CONTAINER
// ============================================
const rootElement = document.getElementById("root");

/*
ROOT ELEMENT PURPOSE:
- Connects React application to the HTML DOM
- Must match <div id="root"></div> in index.html
*/


// ============================================
// APPLICATION RENDERING
// ============================================
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </StrictMode>
);

/*
RENDER TREE PURPOSE:
1️⃣ StrictMode
   - Activates React development checks
   - Helps detect unsafe lifecycle usage
   - Runs extra validations in development only

2️⃣ AuthProvider
   - Provides global authentication state
   - Enables protected routes and login persistence
   - Makes login/logout functions available anywhere

3️⃣ PostProvider
   - Provides global post/feed state
   - Fetches posts after authentication
   - Makes posts accessible across components

4️⃣ App Component
   - Root UI of the application
   - Contains routing system via AppRoutes
   - Controls page navigation and structure
*/


// ============================================
// FILE RESPONSIBILITIES
// ============================================
/*
✔ Bootstraps the React application
✔ Connects React to DOM
✔ Wraps the app with global state providers (Auth + Post)
✔ Enables authentication-aware UI
✔ Enables centralized post/feed management
✔ Keeps entry point minimal, clear, and scalable
*/