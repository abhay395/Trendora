import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

export default function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const { user } = useUserStore()
    // Not logged in → go to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    // Logged in but wrong role → go to unauthorized
    if (allowedRole && user?.role !== allowedRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
