// ============================================
// IMPORTS
// ============================================
import AppRoutes from "./App.Routes";

/*
IMPORT PURPOSE:
- AppRoutes → centralized routing configuration
- Keeps routing logic separate from the main app container
- Ensures clean separation of concerns between UI and navigation
*/


// ============================================
// ROOT APPLICATION COMPONENT
// ============================================
const App = () => {
  return (
    <>
      <AppRoutes />
    </>
  );
};

/*
COMPONENT PURPOSE:
- Serves as the main UI container for the application
- Does NOT manage state, authentication, or business logic
- Renders only the routing system
- Maintains clean architecture and separation of concerns
*/


// ============================================
// EXPORT
// ============================================
export default App;

/*
EXPORT PURPOSE:
- Makes App component available to main.jsx
- Allows ReactDOM to render the application
*/


// ============================================
// MODULE SUMMARY
// ============================================

/*
This module defines the root App component:
✔ Loads centralized routing via AppRoutes
✔ Does not handle business logic or state
✔ Keeps architecture clean by separating routing from UI
✔ Serves as the entry point for the application
*/