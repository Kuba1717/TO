import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";

function PublicRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
