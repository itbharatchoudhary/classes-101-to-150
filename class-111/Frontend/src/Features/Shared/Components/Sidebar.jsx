import React from "react";
import { Link, useLocation } from "react-router-dom";
// import profileImage from "../Frontend/public/profile.jpg";


const Sidebar = ({ open, setOpen }) => {
    const location = useLocation();

    function NavItem({ icon, label, to, open }) {
        const active = location.pathname === to;
        return (
            <Link
                to={to}
                className={`w-full flex items-center ${open ? "gap-5 px-5" : "justify-center"} py-2 transition-all duration-300`}
            >
                <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition ${active ? "bg-white text-black" : "hover:bg-white/5" }`}
                >
                    <i className={`${icon} text-2xl`}></i>
                </div>

                <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${open ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}`}>
                    {label}
                </span>
            </Link>
        );
    }

    return (
        <aside
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-black text-white border border-white p-4 flex flex-col transition-all duration-300 ease-in-out z-40 ${open ? "w-72" : "w-20 items-center"}`}
        >
            {/* Navigation */}
            <nav className="w-full">
                <NavItem icon="ri-home-5-fill" label="Home" to="/" open={open} />
                <NavItem icon="ri-compass-3-line" label="Explore" to="/Explore" open={open} />
                <NavItem icon="ri-send-ins-line" label="Messages" to="/Messages" open={open} />
                <NavItem icon="ri-heart-line" label="Notification" to="/Notification" open={open} />
                <NavItem icon="ri-add-line" label="Create" to="/Create" open={open} />
                <NavItem icon="ri-bookmark-fill" label="Library" to="/Library" open={open} />
                <NavItem icon="ri-settings-5-line" label="Setting" to="/Setting" open={open} />
            </nav>

            {/* Profile */}
            <div className="mt-auto w-full">
                <Link
                    to="/Profile"
                    className={`w-full flex items-center transition-all duration-300 ${open ? "gap-4 px-4 py-3" : "justify-center py-3"}`}
                >
                    <img
                        src="/profile.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${open ? "opacity-100 max-w-[150px]" : "opacity-0 max-w-0"}`}>Profile</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
