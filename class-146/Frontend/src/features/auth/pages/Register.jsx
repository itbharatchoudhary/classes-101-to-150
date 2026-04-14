import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from 'react-router';
import GoogleBtn from '../components/GoogleBtn';

const Register = () => {

    const { handleRegister } = useAuth();
    const navigate = useNavigate();

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
        });
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#0e0e0e] text-[#e5e2e1]">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative border-r border-[#1c1b1b]">

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
                            Define your aesthetic.
                        </h1>

                        <p className="text-sm text-[#bdb6a0] max-w-sm">
                            Join creators and brands shaping modern fashion.
                        </p>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex justify-center px-6 sm:px-12 lg:px-20 py-10">

                {/* Scroll-safe container */}
                <div className="w-full max-w-sm flex flex-col justify-center">

                    {/* HEADER */}
                    <div className="mb-8">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#FFD700] mb-2">
                            Welcome
                        </p>
                        <h1 className="text-2xl font-semibold leading-tight">
                            Create Account
                        </h1>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {[
                            { label: "Full Name", name: "fullName", type: "text" },
                            { label: "Contact Number", name: "contactNumber", type: "tel" },
                            { label: "Email Address", name: "email", type: "email" },
                            { label: "Password", name: "password", type: "password" }
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-1.5">
                                <label className="text-sm text-[#bdb6a5]">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#3a3525] rounded-md px-3 py-2.5 text-white outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all duration-200"
                                />
                            </div>
                        ))}

                        {/* CHECKBOX */}
                        <label className="flex items-center gap-2 text-sm cursor-pointer mt-1">
                            <input
                                type="checkbox"
                                name="isSeller"
                                checked={formData.isSeller}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#FFD700]"
                            />
                            Register as Seller
                        </label>

                        {/* GOOGLE BUTTON */}
                        <div className="pt-2">
                            <GoogleBtn />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            className="mt-3 bg-[#FFD700] text-black py-2.5 font-semibold rounded-md 
                            hover:opacity-90 transition-all duration-200"
                        >
                            Sign Up
                        </button>

                        {/* FOOTER */}
                        <p className="text-sm text-center text-[#9f987f] mt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#FFD700] hover:underline">
                                Sign in
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;