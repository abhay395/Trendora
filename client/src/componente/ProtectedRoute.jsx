import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { MoonLoader } from "react-spinners";

export default function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const { user, isLoading } = useUserStore();

    // Wait until user state is loaded
    if (isLoading) {
        return <div className='h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100'>
            <MoonLoader color='#111' size={60} />
        </div>
    }

    // Not logged in → go to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role → go to unauthorized
    if (allowedRole && user?.role !== allowedRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
