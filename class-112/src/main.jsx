import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
APPLICATION ENTRY POINT

✔ Imports Tailwind CSS
✔ Mounts React app
✔ Enables strict mode for safe rendering
*/