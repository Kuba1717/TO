import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";

function PrivateRoute({requiredRole }) {
    const { isAuthenticated, loading, hasRole } = useAuth();

    if (loading){
        return <div>Loading...</div>
    }
    if (!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && !hasRole(requiredRole)){
        return <Navigate to="/main" replace />;
    }


    return <Outlet />;
}

export default PrivateRoute;
