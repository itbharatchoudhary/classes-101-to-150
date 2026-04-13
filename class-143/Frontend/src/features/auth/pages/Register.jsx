import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth"
import { useNavigate, Link } from 'react-router';

const Register = () => {

    const { handleRegister } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({
            email: formData.email,
            contact: formData.contactNumber,
            password: formData.password,
            isSeller: formData.isSeller,
            fullname: formData.fullName
        })
        navigate("/")
    };

    return (
        <div className="h-screen flex flex-col lg:flex-row bg-[#0e0e0e] text-[#e5e2e1] overflow-hidden">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative border-r border-[#1c1b1b]">

                <img
                    src="/snitch_editorial.png"
                    alt="Snitch"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>

                {/* CONTENT CONTAINER */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full px-12 py-12">

                    {/* TOP - BRAND */}
                    <h2 className="text-[#FFD700] text-sm tracking-widest uppercase">
                        Snitch
                    </h2>

                    {/* BOTTOM - TEXT */}
                    <div>
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Define your aesthetic.
                        </h1>

                        <p className="text-sm text-[#bdb6a0] max-w-sm">
                            Join creators and brands shaping modern fashion.
                        </p>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8">

                <div className="w-full max-w-sm"> {/* reduced from max-w-md */}

                    {/* HEADER */}
                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-widest text-[#FFD700] mb-2">
                            Welcome
                        </p>
                        <h1 className="text-2xl font-semibold"> {/* slightly smaller */}
                            Create Account
                        </h1>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5"> {/* reduced gap */}

                        {[
                            { label: "Full Name", name: "fullName", type: "text" },
                            { label: "Contact Number", name: "contactNumber", type: "tel" },
                            { label: "Email Address", name: "email", type: "email" },
                            { label: "Password", name: "password", type: "password" }
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-1">
                                <label className="text-sm text-[#bdb6a5]">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#3a3525] rounded-md px-3 py-2 text-white outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition"
                                />
                            </div>
                        ))}

                        {/* CHECKBOX */}
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                name="isSeller"
                                checked={formData.isSeller}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#FFD700]"
                            />
                            Register as Seller
                        </label>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="mt-2 bg-[#FFD700] text-black py-2.5 font-semibold rounded-md 
                hover:opacity-90 transition"
                        >
                            Sign Up
                        </button>

                        {/* FOOTER */}
                        <p className="text-sm text-center text-[#9f987f]">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#FFD700] hover:underline">Sign in</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;