import AppRoutes from "./AppRoutes";
// Centralized route configuration for the entire application


/* =========================================================
   ROOT APPLICATION COMPONENT
   - This is the main UI container
   - Authentication provider is already wrapped in main.jsx
   - Responsible only for rendering application routes
========================================================= */
const App = () => {
  return (
    <>
      {/* =====================================================
         APPLICATION ROUTES RENDERING
         - Handles navigation between pages
         - All pages load through AppRoutes
      ===================================================== */}
      <AppRoutes />
    </>
  );
};

export default App;