import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/* =========================================================
   AXIOS INSTANCE
   - Central API configuration
   - Enables cookie authentication
   - Prevents repeating base URL everywhere
========================================================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // required for JWT cookie auth
});

export default function LoginForm() {
  const navigate = useNavigate();

  /* =========================================================
     FORM STATE MANAGEMENT
     - Stores user input
     - Backend expects: identifier + password
  ========================================================= */
  const [form, setForm] = useState({
    identifier: "", // email OR username
    password: "",
    remember: false, // UI only (optional feature)
  });

  const [loading, setLoading] = useState(false); // controls button state
  const [showPassword, setShowPassword] = useState(false); // toggle visibility
  const [error, setError] = useState(""); // shows error messages

  /* =========================================================
     HANDLE INPUT CHANGE
     - Works for text + checkbox
     - Updates correct field dynamically
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
     - Sends login request to backend
     - Stores cookie automatically
     - Redirects after success
  ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post("/auth/login", {
        identifier: form.identifier,
        password: form.password,
      });

      alert("Login successful ✅ Welcome back!");

      // after successful login → redirect to home/dashboard
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 max-w-md mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* =========================================================
           HEADER
        ========================================================= */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your account
          </p>
        </div>

        {/* =========================================================
           ERROR DISPLAY
        ========================================================= */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {/* =========================================================
           LOGIN FORM
        ========================================================= */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* IDENTIFIER INPUT (EMAIL OR USERNAME) */}
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

          {/* REMEMBER CHECKBOX (UI FEATURE ONLY) */}
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
          <Link to="/register" className="text-black font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}