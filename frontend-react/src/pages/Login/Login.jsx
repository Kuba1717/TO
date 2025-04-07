import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Login.css'

function Login() {
    const { login } = useAuth();

    return (
        <div>
            <div className="login-container">
                <p className="hello-word">Witaj</p>
                <p className="login-word">Zaloguj się</p>
                <p className="email-word">E-mail</p>
                <input className="email-input-data" type={"text"}/>
                <p className="email-word">Hasło</p>
                <input className="password-input-data" type={"text"}/>
                <button className="register-button">Zaloguj</button>
            </div>


        </div>
    );
}

export default Login;
