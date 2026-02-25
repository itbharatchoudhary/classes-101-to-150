// ============================================
// IMPORTS
// ============================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

/*
IMPORT PURPOSE:
- useState → manages local form and UI state
- useNavigate → programmatic navigation after login
- useAuth → centralized authentication logic via AuthContext
*/


// ============================================
// LOGIN FORM COMPONENT
// ============================================

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  /*
  COMPONENT SETUP PURPOSE:
  - navigate → handles redirect after successful login
  - login → calls backend authentication through context
  */


  // ============================================
  // FORM STATE MANAGEMENT
  // ============================================

  const [form, setForm] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  /*
  FORM STATE PURPOSE:
  - identifier → stores user email or username
  - password → stores user password
  - remember → UI-only checkbox state for "Remember me"
  */


  // ============================================
  // UI STATE MANAGEMENT
  // ============================================

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  UI STATE PURPOSE:
  - loading → disables form during submission
  - showPassword → toggles password visibility
  - error → displays validation or backend error
  - success → shows login success message
  */


  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /*
  INPUT HANDLER PURPOSE:
  - Dynamically updates form state
  - Supports both text input and checkbox inputs
  */


  // ============================================
  // HANDLE FORM SUBMISSION
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Input validation
    if (!form.identifier || !form.password) {
      return setError("Please enter email/username and password");
    }

    try {
      setLoading(true);

      // Call login function from context
      await login(form.identifier, form.password);

      setSuccess("Login successful. Redirecting to Feed...");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/feed", { replace: true });
      }, 1000);

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /*
  SUBMISSION FLOW PURPOSE:
  - Prevent default form behavior
  - Validate user input
  - Call authentication logic from context
  - Display feedback to user
  - Redirect authenticated users
  */


  // ============================================
  // RENDER COMPONENT UI
  // ============================================

  return (
    <div className="w-full mt-10 max-w-md mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* FEEDBACK MESSAGES */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-600 text-center">{success}</div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* IDENTIFIER INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              required
              value={form.identifier}
              onChange={handleChange}
              placeholder="Enter email or username"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* REMEMBER ME */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Remember me
          </label>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );

  /*
  UI PURPOSE:
  - Renders login form
  - Displays dynamic feedback messages
  - Handles user input and interaction
  - Provides navigation link to registration page
  */
}


/*
COMPONENT RESPONSIBILITIES / SUMMARY:
✔ Manages login form state and UI state
✔ Handles user input and form submission
✔ Integrates with centralized authentication context
✔ Displays dynamic success and error messages
✔ Redirects authenticated users to the feed
✔ Provides professional, accessible UI structure
*/