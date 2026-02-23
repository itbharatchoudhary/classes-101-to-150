// LoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth"; // Use our custom hook to access auth context

/* =========================================================
   LOGIN FORM COMPONENT
   - Handles user login
   - Uses centralized auth context
   - Manages form state, UI state, and feedback messages
========================================================= */
export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Grab login function from context

  /* =========================================================
     FORM STATE MANAGEMENT
     - Stores user input values
     - identifier = username or email
  ========================================================= */
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    remember: false, // UI-only feature
  });

  /* =========================================================
     UI STATE MANAGEMENT
     - loading → disables submit button during API call
     - showPassword → toggles password visibility
     - error → displays validation or server errors
     - success → shows success message
  ========================================================= */
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     HANDLE INPUT CHANGE
     - Updates state for text inputs and checkbox
  ========================================================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================================================
     HANDLE FORM SUBMISSION
     - Calls login function from context
     - Provides professional UX feedback
     - Redirects on successful login
  ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.identifier || !form.password) {
      return setError("Please enter email/username and password");
    }

    try {
      setLoading(true);

      // Use centralized login function from AuthContext
      await login(form.identifier, form.password);

      // Success feedback
      setSuccess("Login successful. Redirecting...");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      // Show backend or generic error
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RENDER COMPONENT
     - Includes form, error/success messages, and navigation
  ========================================================= */
  return (
    <div className="w-full mt-10 max-w-md mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}

        {/* SUCCESS MESSAGE */}
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

        {/* NAVIGATION TO REGISTER */}
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
}