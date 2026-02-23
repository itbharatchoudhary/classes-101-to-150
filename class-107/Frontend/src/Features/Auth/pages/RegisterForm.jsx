import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/* =========================================================
   AXIOS INSTANCE CONFIGURATION
   - Sets base URL for API
   - Enables cookies (important for JWT cookie from backend)
========================================================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // required for cookie-based auth
});

export default function RegisterForm() {
  const navigate = useNavigate();

  /* =========================================================
     FORM STATE MANAGEMENT
     - Stores all input values
     - Matches backend field names exactly
  ========================================================= */
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    imageUrl: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false); // controls submit button state
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const [error, setError] = useState(""); // displays validation/server errors

  /* =========================================================
     HANDLE INPUT CHANGE
     - Works for all input types
     - Updates state dynamically using input name
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
     - Validates passwords
     - Sends data to backend
     - Handles success + errors
  ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // client-side validation
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        bio: form.bio || undefined,
        imageUrl: form.imageUrl || undefined,
      });

      // redirect after successful registration
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 max-w-md mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* =========================================================
           HEADER SECTION
        ========================================================= */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start your journey with us
          </p>
        </div>

        {/* =========================================================
           ERROR DISPLAY
           - Shows backend or validation errors
        ========================================================= */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {/* =========================================================
           REGISTRATION FORM
        ========================================================= */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />

            {form.password &&
              form.confirmPassword &&
              form.password !== form.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
          </div>

          {/* OPTIONAL BIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio (optional)
            </label>
            <input
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* OPTIONAL PROFILE IMAGE URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL (optional)
            </label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* TERMS AGREEMENT */}
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

        {/* NAVIGATION TO LOGIN */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}