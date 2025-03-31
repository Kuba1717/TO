import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function Login() {
    const { login } = useAuth();

    return (
        <div>
            <h1>Strona Logowania</h1>
            <button onClick={login}>Zaloguj</button>
        </div>
    );
}

export default Login;
