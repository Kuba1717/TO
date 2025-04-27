import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Home.css';
import {useNavigate} from "react-router-dom";

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };
    const handleMainClick = () => {
        navigate('/main');
    };


    return (
        <div className="home-container">
            <h1>Witaj, {user?.email}!</h1>

            <div className="user-info">
                <h2>Informacje o użytkowniku</h2>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.roles?.join(', ') || 'Brak ról'}</p>
            </div>

            <button className="logout-button" onClick={handleLogout}>
                Wyloguj
            </button>
            <button className="logout-button" onClick={handleMainClick}>
                Main
            </button>
        </div>
    );
}

export default Home;
