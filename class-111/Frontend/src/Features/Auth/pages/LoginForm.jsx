import { useState } from "react";
import { useAuth } from "../Context/Auth.Context";
import { useNavigate, Link } from "react-router-dom";

/*
======================================================
LOGIN PAGE
======================================================
- Clean card UI
- Error handling
- Redirect after login
*/

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");

  /*
  ======================================================
  HANDLE FORM SUBMIT
  ======================================================
  Calls auth login and redirects
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Identifier Input */}
        <input
          type="text"
          placeholder="Email or Username"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
          onChange={(e) =>
            setForm({ ...form, identifier: e.target.value })
          }
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Submit Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition">
          Login
        </button>

        {/* Navigate to Register */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-black">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}