import React from 'react';
import './Success.css'
import Header from "../../components/Header/Header.jsx";

function Success() {

    return (
        <div>
            <Header/>
            <div className="success-page-container">
                <div className="success-container">
                    <p className="success-title">
                        Sukces!
                    </p>
                    <p className="success-text">
                        Udało Ci się złożyć zamówienie. <br/>
                        Twoje auto będzie gotowe: <br/>
                        17.03.2025 godz 18:45.
                    </p>
                    <p className="success-thanks-text">
                        Dziękujemy za zakupy!
                    </p>
                    <button className="success-button">
                        OK
                    </button>

                </div>
            </div>


        </div>
    );
}

export default Success;
