import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router";
import GoogleBtn from '../components/GoogleBtn';


const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin({
                email: formData.email,
                password: formData.password
            });
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="h-screen flex flex-col lg:flex-row bg-[#0e0e0e] text-[#e5e2e1] overflow-hidden">

            {/* LEFT SIDE (same as register) */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center border-r border-[#1c1b1b]">
                <img
                    src="/snitch_editorial.png"
                    alt="Snitch"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>

                <div className="relative z-10 flex flex-col justify-between h-full w-full px-12 py-12">
                    <h2 className="text-[#FFD700] text-sm tracking-widest uppercase">
                        Snitch
                    </h2>

                    <div>
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Welcome back.
                        </h1>

                        <p className="text-sm text-[#bdb6a0] max-w-sm">
                            Sign in to continue your fashion journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8">

                <div className="w-full max-w-sm">

                    {/* HEADER */}
                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-widest text-[#FFD700] mb-2">
                            Welcome Back
                        </p>
                        <h1 className="text-2xl font-semibold">
                            Sign In
                        </h1>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#bdb6a5]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#1a1a1a] border border-[#3a3525] rounded-md px-3 py-2 text-white outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#bdb6a5]">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#1a1a1a] border border-[#3a3525] rounded-md px-3 py-2 text-white outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition"
                            />
                        </div>

                        <GoogleBtn />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="mt-2 bg-[#FFD700] text-black py-2.5 font-semibold rounded-md hover:opacity-90 transition"
                        >
                            Sign In
                        </button>

                        {/* FOOTER */}
                        <p className="text-sm text-center text-[#9f987f]">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-[#FFD700] hover:underline">Sign up</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;