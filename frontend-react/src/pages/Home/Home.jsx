import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function Home() {
    const { logout } = useAuth();

    return (
        <div>
            <h1>Strona Główna (chroniona)</h1>
            <button onClick={logout}>Wyloguj</button>
        </div>
    );
}

export default Home;
