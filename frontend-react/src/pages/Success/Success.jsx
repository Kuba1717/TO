import React from 'react';
import './Success.css';
import Header from "../../components/Header/Header.jsx";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function Success() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="success-page-container">
                <div className="success-container">
                    <p className="success-title">
                        Sukces!
                    </p>
                    <p className="success-text">
                        Udało Ci się umówić jazdę próbną<br/>
                        Termin: <br/><br/>
                        {state?.appointmentDate || "brak danych"}
                    </p>
                    <p className="success-thanks-text">
                        Dziękujemy za skorzystanie z naszych usług!
                    </p>
                    <button
                        className="success-button"
                        onClick={() => navigate('/main')}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Success;
