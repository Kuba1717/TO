import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider} from "../context/AuthContext.jsx";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import Register from "../pages/Register/Register.jsx";
import Main from "../pages/Main/Main.jsx";
import Offer from "../pages/Offer/Offer.jsx";
import Book from "../pages/Book/Book.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Success from "../pages/Success/Success.jsx";
import History from "../pages/History/History.jsx";
import AddOffer from "../pages/AddOffer/AddOffer.jsx";

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
                        <Route path="/main" element={<Main />} />
                        <Route path="/offer/:id" element={<Offer />} />
                        <Route path="/book/:id" element={<Book />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/success/:id" element={<Success />} />
                        <Route path="/addOffer" element={<AddOffer />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;
