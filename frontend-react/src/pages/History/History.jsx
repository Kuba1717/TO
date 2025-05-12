import React from 'react';
import './History.css'
import Header from "../../components/Header/Header.jsx";

function History() {
    const totalPages  = 3;
    const currentPage = 1;
    return (
        <div>
            <Header/>
            <div className="history-page-container">


                <div className="history-container">
                    <p className="history-title">
                        Historia jazd próbnych
                    </p>
                    <div className="history-vertical-container">

                        <div className="history-offer-card">
                            <div className="history-offer-horizontal-container">
                                <img src="" alt=""/>
                                <div className="history-offer-vertical-container">
                                    <h3 className="history-offer-title">Tytuł oferty</h3>
                                    <p className="history-offer-text">
                                        Status:<br/>
                                        W trakcie<br/>
                                        Data umówienia się na jazdę próbną:<br/>
                                        05.03.2025<br/>
                                        Data jazdy próbnej:<br/>
                                        05.03.2025 godz. 18:45

                                    </p>
                                </div>
                                <p className="history-offer-price">61 900 PLN</p>
                            </div>
                        </div>
                        <div className="history-offer-card">
                            <div className="history-offer-horizontal-container">
                                <img src="" alt=""/>
                                <div className="history-offer-vertical-container">
                                    <h3 className="history-offer-title">Tytuł oferty</h3>
                                    <p className="history-offer-text">
                                        Status:<br/>
                                        W trakcie<br/>
                                        Data umówienia się na jazdę próbną:<br/>
                                        05.03.2025<br/>
                                        Data jazdy próbnej:<br/>
                                        05.03.2025 godz. 18:45

                                    </p>
                                </div>
                                <p className="history-offer-price">61 900 PLN</p>
                            </div>
                        </div>
                        <div className="pagination">
                            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    disabled={page === currentPage}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
}

export default History;
