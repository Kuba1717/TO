import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider} from "../context/AuthContext.jsx";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import Register from "../pages/Register/Register.jsx";

function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                    </Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;
