import React, { useEffect, useState } from 'react';
import './History.css';
import Header from '../../components/Header/Header.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function History() {
    const { api, user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get(`/appointment/user/${encodeURIComponent(user.email)}`);
                const appointmentsData = response.data;

                const detailedAppointments = await Promise.all(
                    appointmentsData.map(async (appointment) => {
                        const annResponse = await api.get(`/announcement/with-images/${appointment.announcementId}`);
                        return {
                            ...appointment,
                            announcement: annResponse.data
                        };
                    })
                );

                setAppointments(detailedAppointments);
            } catch (error) {
                console.error('Błąd pobierania historii jazd próbnych:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [api, user.email]);

    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentAppointments = appointments.slice(indexOfFirst, indexOfLast);

    return (
        <div>
            <Header />
            <div className="history-page-container">
                <div className="history-container">
                    <p className="history-title">Historia jazd próbnych</p>
                    <div className="history-vertical-container">
                        {loading ? (
                            <p>Ładowanie...</p>
                        ) : (
                            currentAppointments.map(appt => (
                                <div key={appt.id} className="history-offer-card">
                                    <div className="history-offer-horizontal-container">
                                        <img src={appt.announcement.imageUrls?.[0]} alt="Ogłoszenie" />
                                        <div className="history-offer-vertical-container">
                                            <h3 className="history-offer-title">{appt.announcement.name}</h3>
                                            <p className="history-offer-text">
                                                Status: <br />
                                                {appt.status} <br />
                                                Data jazdy: <br />
                                                {new Date(appt.appointmentDate).toLocaleDateString()} <br />
                                                Godzina: {new Date(appt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        <p className="history-offer-price">
                                            {appt.announcement.price?.toLocaleString()} PLN
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {!loading && totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    disabled={page === currentPage}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default History;
