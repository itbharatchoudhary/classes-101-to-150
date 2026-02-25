import { useState } from "react";
import { useAuth } from "../Context/Auth.Context";
import { useNavigate, Link } from "react-router-dom";

/*
======================================================
REGISTER PAGE
======================================================
Creates MongoDB user via backend
Backend automatically logs user in via cookie
*/

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  /*
  ======================================================
  HANDLE REGISTER SUBMIT
  ======================================================
  Sends user data to backend
  Backend creates MongoDB record and returns user
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-black text-white py-3 rounded-lg">
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-black">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

/*
WHAT THIS FILE DOES
✔ Sends new user data to backend
✔ Backend stores user in MongoDB
✔ Backend returns authenticated session
✔ Redirects to protected area
*/