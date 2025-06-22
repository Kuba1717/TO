import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Book.css';
import Header from '../../components/Header/Header.jsx';
import { Checkbox } from 'antd';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Book() {
    const { id } = useParams();
    const { user, api } = useAuth();
    const [offer, setOffer] = useState(null);
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const availableDates = [
        dayjs().startOf('day'),
        dayjs().add(1, 'day').startOf('day'),
        dayjs().add(2, 'day').startOf('day')
    ];

    const availableTimes = ['16:00', '17:00', '18:00'];

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime) {
            alert("Wybierz datę i godzinę.");
            return;
        }

        const [hour, minute] = selectedTime.split(':');
        const appointmentDate = selectedDate.hour(Number(hour)).minute(Number(minute));

        try {
            await api.post("/appointment", {
                name: "Jazda próbna",
                status: "created",
                appointmentDate: appointmentDate.format('YYYY-MM-DDTHH:mm:ss'),
                announcementId: offer.id
            });

            navigate(`/success/${offer.id}`, {
                state: {
                    appointmentDate: appointmentDate.format("DD.MM.YYYY [godz.] HH:mm")
                }
            });
        } catch (error) {
            console.error("Błąd podczas umawiania wizyty", error);
            alert("Nie udało się umówić wizyty.");
        }

    };

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await api.get(`/announcement/with-images/${id}`);
                setOffer(response.data);
            } catch (err) {
                console.error('Błąd pobierania oferty:', err);
            }
        };

        fetchOffer();
    }, [api, id]);

    if (!offer) return <div>Ładowanie danych oferty...</div>;

    return (
        <div>
            <Header />
            <div className="book-page-container">
                <div className="book-container">
                    <p className="book-title">Umów się na jazdę próbną...</p>

                    <div className="book-offer-card">
                        <div className="book-offer-horizontal-container">
                            <img src={offer.imageUrls?.[0]} alt="Zdjęcie pojazdu" />
                            <div className="book-offer-vertical-container">
                                <h3 className="book-offer-title">{offer.name}</h3>
                                <p className="book-offer-location">
                                    {offer.vehicle?.productionYear} – {offer.vehicle?.mileage?.toLocaleString()} km
                                </p>
                            </div>
                            <p className="book-offer-price">
                                {offer.price?.toLocaleString()} PLN
                            </p>
                        </div>
                    </div>

                    <div className="book-date-horizontal-container">
                        <div>
                            <p className="book-text">Data:</p>
                            <div className="book-checkbox-vertical-container">
                                {availableDates.map(date => (
                                    <Checkbox
                                        key={date.format('YYYY-MM-DD')}
                                        className="book-checkbox"
                                        checked={selectedDate?.isSame(date, 'day')}
                                        onChange={() => setSelectedDate(date)}
                                    >
                                        {date.format('DD MMMM YYYY')}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="book-text">Godzina:</p>
                            <div className="book-checkbox-vertical-container">
                                {availableTimes.map(time => (
                                    <Checkbox
                                        key={time}
                                        className="book-checkbox"
                                        checked={selectedTime === time}
                                        onChange={() => setSelectedTime(time)}
                                    >
                                        {time} - {dayjs(time, 'HH:mm').add(45, 'minute').format('HH:mm')}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="book-confirm-button" onClick={handleConfirm}>
                        Potwierdzam
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Book;
