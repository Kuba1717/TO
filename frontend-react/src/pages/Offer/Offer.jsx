import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Offer.css';
import Header from "../../components/Header/Header.jsx";
import { Carousel } from "antd";
import { LuWalletMinimal } from "react-icons/lu";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Offer() {
    const { id } = useParams();
    const { api } = useAuth();
    const [offer, setOffer] = useState(null);
    const navigate = useNavigate();

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

    if (!offer) return <div>Ładowanie oferty...</div>;

    return (
        <div className="offer-page-container">
            <Header />
            <div className="offer-horizontal-container">
                <div className="offer-vertical-container">
                    <div className="offer-img-container">
                        <Carousel arrows infinite={false}>
                            {(offer.imageUrls || []).map((src, idx) => (
                                <div key={idx}>
                                    <img
                                        src={src}
                                        alt={`Zdjęcie ${idx + 1}`}
                                        className="offer-image"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div className="offer-description-container">
                        <div className="offer-horizontal-container">
                            <PiMagnifyingGlassBold className="loupe-icon" />
                            <p className="offer-description-title">Opis</p>
                        </div>
                        <p className="offer-description-text">
                            {offer.description}
                        </p>
                    </div>
                </div>

                <div className="offer-panel-container">
                    <p className="offer-panel-title">{offer.name}</p>
                    <p className="offer-panel-price">
                        {offer.price ? `${offer.price.toLocaleString()} PLN` : 'Cena nie podana'}
                    </p>

                    <div className="offer-buy-button"
                         onClick={() => navigate(`/book/${offer.id}`)}
                    >
                        <LuWalletMinimal className="buy-icon"/>

                    </div>
                    <div className="offer-contact-button">
                        <HiDevicePhoneMobile className="contact-icon"/>
                    </div>

                    <div className="offer-information-container">
                        <p className="offer-information-title">Informacje</p>
                        <p className="offer-information-text">
                            {offer.vehicle?.productionYear && <>* {offer.vehicle.productionYear}<br/></>}
                            {offer.vehicle?.mileage && <>* {offer.vehicle.mileage.toLocaleString()} km<br/></>}
                            {offer.vehicle?.fuelType && <>* {offer.vehicle.fuelType}<br/></>}
                            {offer.vehicle?.engineCapacity && <>* {offer.vehicle.engineCapacity} cm³<br/></>}
                            {offer.vehicle?.power && <>* {offer.vehicle.power} KM<br/></>}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Offer;
