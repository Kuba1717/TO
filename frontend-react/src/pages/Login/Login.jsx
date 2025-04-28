import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();


        setLoading(true);
        try {
            await login(email, password);
            navigate('/main');
        } catch (err) {
            console.log(err.response?.data?.message || 'Błąd logowania')
        } finally {
            setLoading(false);
        }
    };
    const navigateToRegister = () => {
        navigate('/register');
    };



    return (
        <div>
            <div className="login-container">
                <p className="hello-word">Witaj</p>
                <p className="login-word">Zaloguj się</p>
                <p className="email-word">E-mail</p>
                <input
                    className="email-input-data"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <p className="email-word">Hasło</p>
                <input
                    className="password-input-data"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button
                    className="login-button"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Logowanie...' : 'Zaloguj'}
                </button>
                <button
                    className="nav-register-button"
                    onClick={navigateToRegister}
                >Nie masz konta? Zarejestruj się
                </button>

            </div>


        </div>
    );
}

export default Login;
