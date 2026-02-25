import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./Features/Auth/Context/Auth.Context";

/*
======================================================
APP ENTRY POINT
======================================================
Wraps entire app with AuthProvider
Provides global authentication state
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);