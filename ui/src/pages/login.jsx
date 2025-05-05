import React from "react";

const Login = () => {
    const handleSubmit = () => {
        const params = new URLSearchParams({
            response_type: "code",
            client_id: import.meta.env.VITE_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
            scope: "openid email profile",
        });

        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-4">
            <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="p-8 text-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Sign in with LinkedIn to continue
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-3 bg-[#0077B5] hover:bg-[#006097] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-white"
                        >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        Continue with LinkedIn
                    </button>

                    <div className="mt-6 text-sm text-gray-500">
                        By continuing, you agree to our Terms of Service
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
