import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setError('Proszę wypełnić wszystkie pola');
            return;
        }
        if (password !== confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        if (password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków');
            return;
        }

        setLoading(true);
        try {
            await register(username, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Błąd rejestracji');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="register-container">
                <p className="join-word">Dołącz!</p>
                <p className="register-word">Zarejestruj się</p>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}


                <p className="email-word">Nazwa użytkownika</p>
                <input
                    className="email-input-data"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <p className="email-word">Powtórz hasło</p>
                <input
                    className="repeat-password-input-data"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className="register-button"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? 'Rejestracja...' : 'Zarejestruj'}
                </button>

                <button
                    className="nav-register-button"
                    onClick={() => navigate('/login')}
                >
                    Masz już konto? Zaloguj się
                </button>


            </div>




        </div>
    );
}

export default Register;
