// ============================================
// IMPORTS
// ============================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

/*
IMPORT PURPOSE:
- useState → manages local form and UI state
- useNavigate → programmatic navigation after registration
- useAuth → provides centralized authentication actions via context
*/


// ============================================
// REGISTER FORM COMPONENT
// ============================================

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  /*
  COMPONENT SETUP PURPOSE:
  - navigate → handles page redirection after successful registration
  - register → calls backend to create new user
  */


  // ============================================
  // FORM STATE MANAGEMENT
  // ============================================

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    imageUrl: "",
    agree: false,
  });

  /*
  FORM STATE PURPOSE:
  - Stores all user input values
  - Matches backend expected fields
  - Includes optional profile data for bio and image
  */


  // ============================================
  // UI STATE MANAGEMENT
  // ============================================

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /*
  UI STATE PURPOSE:
  - loading → disables submit button during API call
  - showPassword → toggles password visibility
  - error → displays validation or server errors
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
  - Supports text, email, password, and checkbox inputs
  */


  // ============================================
  // HANDLE FORM SUBMISSION
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!form.agree) {
      return setError("You must accept the terms");
    }

    try {
      setLoading(true);

      // Call register function from AuthContext
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        bio: form.bio || undefined,
        imageUrl: form.imageUrl || undefined,
      });

      // Redirect user to login page after successful registration
      navigate("/login");

    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /*
  SUBMISSION FLOW PURPOSE:
  - Prevents default form submission
  - Performs client-side validation
  - Sends registration data to backend
  - Redirects to login page on success
  - Handles errors and updates UI feedback
  */


  // ============================================
  // RENDER COMPONENT UI
  // ============================================

  return (
    <div className="w-full mt-10 max-w-md mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Start your journey with us</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}

        {/* REGISTRATION FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
            {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* BIO (OPTIONAL) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio (optional)</label>
            <input
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* PROFILE IMAGE URL (OPTIONAL) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* TERMS AND CONDITIONS */}
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              required
              checked={form.agree}
              onChange={handleChange}
              className="w-4 h-4 mt-1"
            />
            I agree to the Terms & Conditions
          </label>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );

  /*
  UI PURPOSE:
  - Displays registration form with validation
  - Provides optional fields for bio and profile image
  - Shows dynamic error messages
  - Handles password visibility toggle
  - Navigates to login page after successful registration
  */
}


/*
COMPONENT RESPONSIBILITIES / SUMMARY:
✔ Manages registration form state and UI state
✔ Handles user input and client-side validation
✔ Integrates with centralized authentication context (register function)
✔ Displays dynamic success and error messages
✔ Redirects newly registered users to login page
✔ Provides professional, clean, and accessible UI structure
*/