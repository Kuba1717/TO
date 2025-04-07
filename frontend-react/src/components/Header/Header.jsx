import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>AUTO KOMIS</h1>
            <div className="header-nav-buttons">
                <button className="header-nav-login-button">Zaloguj</button>
                <button className="header-nav-register-button">Zarejestruj</button>
            </div>
        </header>
    );
};

export default Header;
