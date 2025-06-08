import React, { useState, useEffect } from 'react';
import './OfferList.css';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

const OfferList = ({ filters, marks, models, types }) => {
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

    const getModelName = (id) => models.find(m => m.id === id)?.name || '';
    const getMarkName = (modelId) => {
        const model = models.find(m => m.id === modelId);
        return marks.find(mark => mark.id === model?.markId)?.name || '';
    };
    const getTypeName = (id) => types.find(t => t.id === id)?.name || '';

    const applyFilters = (offers) => {
        return offers.filter((offer) => {
            const v = offer.vehicle || {};

            const markName = getMarkName(v.modelId);
            const modelName = getModelName(v.modelId);
            const typeName = getTypeName(v.typeId);

            return (
                (!filters.mark || markName.toLowerCase().includes(filters.mark.toLowerCase())) &&
                (!filters.model || modelName.toLowerCase().includes(filters.model.toLowerCase())) &&
                (!filters.type || typeName.toLowerCase().includes(filters.type.toLowerCase())) &&
                (!filters.productionYear || v.productionYear <= filters.productionYear) &&
                (!filters.colour || v.colour?.toLowerCase().includes(filters.colour.toLowerCase())) &&
                (!filters.fuelType || v.fuelType?.toLowerCase().includes(filters.fuelType.toLowerCase())) &&
                (!filters.engineCapacity || v.engineCapacity <= filters.engineCapacity) &&
                (!filters.condition || v.condition?.toLowerCase().includes(filters.condition.toLowerCase())) &&
                (!filters.power || v.power <= filters.power) &&
                (!filters.mileage || v.mileage <= filters.mileage)
            );
        });
    };

    const filteredOffers = applyFilters(offers);
    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffers = filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer);
    const totalPages = Math.ceil(filteredOffers.length / offersPerPage);

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