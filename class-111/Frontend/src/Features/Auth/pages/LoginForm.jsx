import { useState } from "react";
import { useAuth } from "../Context/Auth.Context";
import { useNavigate, Link } from "react-router-dom";

/*
======================================================
LOGIN PAGE
======================================================
Authenticates user using backend MongoDB + JWT cookie
Sends identifier (email OR username) and password
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
  Sends credentials to backend
  Backend verifies MongoDB user and sets JWT cookie
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid credentials");
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

        {/* Identifier (email or username) */}
        <input
          type="text"
          placeholder="Email or Username"
          className="w-full border border-gray-300 p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, identifier: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-black text-white py-3 rounded-lg">
          Login
        </button>

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

/*
WHAT THIS FILE DOES
✔ Collects login credentials
✔ Sends identifier + password to backend
✔ Backend validates MongoDB user
✔ Redirects after successful authentication
*/