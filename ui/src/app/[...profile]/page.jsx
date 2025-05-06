"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const params = useParams();

    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user?token=${token}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
            } else {
                console.error("Failed to fetch user data:", data);
            }
        };
        const token = params.profile[1];
        if (token) {
            getUserData();
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Profile
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Welcome to your dashboard
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-blue-600 h-32 w-full"></div>

                    <div className="px-6 pb-6">
                        <div className="flex flex-col items-center -mt-16">
                            <img
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                                src={user?.profilePicture}
                                alt="Profile"
                            />
                            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                                {user?.name}
                            </h2>
                            <p className="text-blue-600">{user?.email}</p>
                            <p className="text-teal-600 text-xs my-4">
                                {user?.phone || "No Phone Number"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
