import React from "react";

const GoogleBtn = () => {
    return (
        <a
            href="/api/auth/google"
            className="group flex items-center justify-center gap-3 w-full rounded-xl border border-gray-200 bg- White px-5 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 ease-out hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Continue with Google"
        >
            {/* Google SVG Icon */}
            <div className="flex items-center justify-center w-6 h-6">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.64 2.1 30.2 0 24 0 14.64 0 6.48 5.48 2.6 13.44l8.04 6.24C12.6 13.2 17.88 9.5 24 9.5z"
                    />
                    <path
                        fill="#4285F4"
                        d="M46.14 24.5c0-1.6-.14-3.14-.4-4.64H24v8.8h12.42c-.54 2.9-2.18 5.36-4.66 7.04l7.18 5.58C43.9 36.88 46.14 31.2 46.14 24.5z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M10.64 28.68a14.5 14.5 0 010-9.36l-8.04-6.24A23.96 23.96 0 000 24c0 3.88.94 7.54 2.6 10.92l8.04-6.24z"
                    />
                    <path
                        fill="#34A853"
                        d="M24 48c6.2 0 11.4-2.06 15.2-5.6l-7.18-5.58c-2 1.34-4.56 2.14-8.02 2.14-6.12 0-11.4-3.7-13.36-9.18l-8.04 6.24C6.48 42.52 14.64 48 24 48z"
                    />
                </svg>
            </div>

            {/* Text */}
            <span className="tracking-wide">
                Continue with Google
            </span>
        </a>
    );
};

export default GoogleBtn;