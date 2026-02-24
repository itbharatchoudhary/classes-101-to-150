// ============================================
// IMPORTS
// ============================================
import { useContext } from "react";
import { AuthContext } from "../Auth.Context";

/*
IMPORT PURPOSE:
- useContext → React hook to access context values
- AuthContext → global authentication context provided by AuthProvider
*/


// ============================================
// CUSTOM HOOK: useAuth
// ============================================
export function useAuth() {
  // Access authentication context
  const context = useContext(AuthContext);

  // SAFETY CHECK:
  // Ensures that this hook is used only within the AuthProvider wrapper
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return context object containing authentication state and actions
  return context;
}


/*
HOOK RESPONSIBILITY / SUMMARY:

- This hook provides a clean and reusable way to access authentication state across components.
- Ensures proper usage by throwing an error if used outside AuthProvider.
- The returned context typically contains:
    • isAuth → Boolean indicating if the user is authenticated
    • login → Function to authenticate user
    • logout → Function to clear authentication
- Usage Example:
    const { isAuth, login, logout } = useAuth();
- This helps keep components clean and avoids prop-drilling authentication state.
*/