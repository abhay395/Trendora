import React from "react";
import { data, Navigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute({ children, allowedRole = [] }) {
    const token = localStorage.getItem("token");
    const { data: user, isLoading } = useUser();
    // Wait until user state is loaded
    if (token && isLoading) {
        return <div className='h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100'>
            <MoonLoader color='#111' size={60} />
        </div>
    }

    // Not logged in → go to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role → go to unauthorized
    if (allowedRole && !allowedRole.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
