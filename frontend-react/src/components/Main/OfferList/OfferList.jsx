import React, { useState, useEffect } from 'react';
import './OfferList.css';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

const OfferList = () => {
    const { api } = useAuth();
    const [offers, setOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const offersPerPage = 8;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await api.get('/announcement/with-images');
                setOffers(response.data);
            } catch (error) {
                console.error('Błąd pobierania ogłoszeń:', error);
            }
        };

        fetchOffers();
    }, [api]);

    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);
    const totalPages = Math.ceil(offers.length / offersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="offer-list">
            {currentOffers.map((offer) => (
                <div
                    key={offer.id}
                    className="offer-card"
                    onClick={() => navigate(`/offer/${offer.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="offer-list-horizontal-container">
                        <Carousel dots={false} className="offer-carousel" autoplay>
                            {(offer.imageUrls || [offer.imageUrl]).map((img, idx) => (
                                <div key={idx}>
                                    <img
                                        src={img}
                                        alt={`${offer.name} ${idx + 1}`}
                                        className="offer-img"
                                    />
                                </div>
                            ))}
                        </Carousel>

                        <div className="offer-list-vertical-container">
                            <h3 className="offer-title">{offer.name}</h3>
                            <p className="offer-location">
                                {offer.location} - {new Date(offer.placedDate).toLocaleDateString()}
                            </p>
                            <p className="offer-description">{offer.description}</p>
                        </div>

                        <p className="offer-price">
                            {offer.price != null ? `${offer.price.toLocaleString()} PLN` : 'Brak'}
                        </p>
                    </div>
                </div>
            ))}

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
    );
};

export default OfferList;
