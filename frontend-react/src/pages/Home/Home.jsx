import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Home.css';

function Home() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
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
        </div>
    );
}

export default Home;
