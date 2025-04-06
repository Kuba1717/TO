import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Register.css'

function Register() {
    const { login } = useAuth();

    return (
        <div>
            <div className="container">
                <p className="join-word">Dołącz!</p>
                <p className="register-word">Zarejestruj się</p>
                <p className="email-word">E-mail</p>
                <input className="email-input-data" type={"text"}/>
                <p className="email-word">Hasło</p>
                <input className="password-input-data" type={"text"}/>
                <p className="email-word">Powtórz hasło</p>
                <input className="repeat-password-input-data" type={"text"}/>
                <button className="register-button">Zarejestruj</button>
            </div>


        </div>
    );
}

export default Register;
