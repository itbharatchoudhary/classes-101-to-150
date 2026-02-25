import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
// import profileImage from "../Frontend/public/profile.jpg";


const Navbar = ({ open, setOpen }) => {
    return (
        <>
            <div className=" bg-black text-white overflow-hidden">

                {/* Navbar */}
                <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 backdrop-blur-xl bg-black border-2 border-white z-50">

                    {/* left */}
                    <div className="flex items-center gap-4">
                        {/* <button
                            onClick={() => setOpen(!open)}
                            className="text-2xl opacity-80 hover:opacity-100">
                            <i className="ri-menu-line"></i>
                        </button> */}
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            Social-Post
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="w-[400px] max-w-[40vw]">
                        <div className="flex items-center gap-3 bg-white/2 border border-white rounded-xl px-4 py-2 backdrop-blur-md">
                            <i className="ri-search-line opacity-60"></i>
                            <input className="bg-transparent outline-none w-full text-sm placeholder:text-white/50"
                                placeholder="Search... " />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-6 text-xl ">
                        <a href="#" className=" opacity-80">
                            <i className="ri-add-large-fill"></i>
                        </a>
                        <div className={`w-full flex items-center ${open ? "gap-4 px-4 py-3" : "justify-center py-3"} rounded-2xl hover:bg-white/5 transition`}>
                            {/* Avatar */}
                            <img
                               src="/profile.jpg"   // replace with real user image
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}



export default Navbar
