import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Header.css';
import { FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleMainClick = () => {
        navigate('/main');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <header className="header">
            <h1 onClick={handleMainClick} className="header-title">AUTO KOMIS</h1>

            {isAuthenticated ? (
                <div className="header-buttons-container">
                    <span className="user-email-display">{user?.email}</span>
                    <button
                        className="icon-button profile-button"
                        onClick={handleProfileClick}
                        aria-label="Profile"
                    >
                        <FiUser className="button-icon" />
                    </button>
                    <button
                        className="icon-button logout-button"
                        onClick={handleLogout}
                        aria-label="Logout"
                    >
                        <FiLogOut className="button-icon" />
                    </button>
                </div>
            ) : (
                <div className="header-nav-buttons">
                    <button
                        className="header-nav-login-button"
                        onClick={handleLoginClick}
                    >
                        Zaloguj
                    </button>
                    <button
                        className="header-nav-register-button"
                        onClick={handleRegisterClick}
                    >
                        Zarejestruj
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
