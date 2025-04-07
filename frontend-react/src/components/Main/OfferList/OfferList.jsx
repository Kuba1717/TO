import React, { useState } from 'react';
import './OfferList.css';

const offersData = [
    { id: 1, title: 'BMW Seria 3 318d Sport Line', price: '50,000 PLN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3KNYMCTrvLQ1_8oL0DDJEmDpIy_yidwkYw&s' },
    { id: 2, title: 'BMW 3 Series', price: '60,000 PLN', image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImhtZXo0OWNpenl1ZzItT1RPTU9UT1BMIn0.6OBLh5YS5om4q5OpcAQvRr-__m6ygqGoEaXB2uPUJU4/image;s=644x461' },
    { id: 3, title: 'Mercedes C-Class', price: '70,000 PLN', image: 'https://devil-cars.pl/storage/images/FT4D2bLWZLPr62rKbf9wE49vclLe0GpLUEQJ7tWq.jpg' },
    { id: 4, title: 'Toyota Corolla', price: '40,000 PLN', image: 'https://storage.googleapis.com/auto-planeta-prod.appspot.com/vehicles/ncDddPfjNwrcR7iGZvqG/thumb_1740660434973_Projekt%20bez%20nazwy%28810%29.webp?GoogleAccessId=ap-prod%40auto-planeta-prod.iam.gserviceaccount.com&Expires=32503680000&Signature=AuFC5Ax5gqBTALSXewGkChsyIj4XsB6OKTWR0s5ujzq0%2BUURIgEgczsGhuB0xjuTcW5CeDSatFtpwVz7L5HhPxWdey%2FzautjcgQsnrQh17cdVzwukj4kWIl6gTak5d%2BkxXQpV1D3U8wmy22v5aLnZ0jUaeRf%2BYEVrfhegXIsqd7Z%2FI7F96YnAduPRHRJzBeLOAkFyN3EpTpQhrpl8ahCzOe52roOvAfSZwq7bW%2F0SasPCdqQuurRfgJvzOPgYqX20kmFM0eVFco823IHJmsdf4NwGvcXO8QQPRhCbFCC7nSjK3mvNxFMHPWdsvKHFlTobzzX%2BzrxSSEGV7kFfx0ojg%3D%3D' },
    { id: 5, title: 'BMW Seria 3 318d Sport Line', price: '50,000 PLN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3KNYMCTrvLQ1_8oL0DDJEmDpIy_yidwkYw&s' },
    { id: 6, title: 'BMW 3 Series', price: '60,000 PLN', image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImhtZXo0OWNpenl1ZzItT1RPTU9UT1BMIn0.6OBLh5YS5om4q5OpcAQvRr-__m6ygqGoEaXB2uPUJU4/image;s=644x461' },
    { id: 7, title: 'Mercedes C-Class', price: '70,000 PLN', image: 'https://devil-cars.pl/storage/images/FT4D2bLWZLPr62rKbf9wE49vclLe0GpLUEQJ7tWq.jpg' },
    { id: 8, title: 'Toyota Corolla', price: '40,000 PLN', image: 'https://storage.googleapis.com/auto-planeta-prod.appspot.com/vehicles/ncDddPfjNwrcR7iGZvqG/thumb_1740660434973_Projekt%20bez%20nazwy%28810%29.webp?GoogleAccessId=ap-prod%40auto-planeta-prod.iam.gserviceaccount.com&Expires=32503680000&Signature=AuFC5Ax5gqBTALSXewGkChsyIj4XsB6OKTWR0s5ujzq0%2BUURIgEgczsGhuB0xjuTcW5CeDSatFtpwVz7L5HhPxWdey%2FzautjcgQsnrQh17cdVzwukj4kWIl6gTak5d%2BkxXQpV1D3U8wmy22v5aLnZ0jUaeRf%2BYEVrfhegXIsqd7Z%2FI7F96YnAduPRHRJzBeLOAkFyN3EpTpQhrpl8ahCzOe52roOvAfSZwq7bW%2F0SasPCdqQuurRfgJvzOPgYqX20kmFM0eVFco823IHJmsdf4NwGvcXO8QQPRhCbFCC7nSjK3mvNxFMHPWdsvKHFlTobzzX%2BzrxSSEGV7kFfx0ojg%3D%3D' },
    { id: 9, title: 'BMW Seria 3 318d Sport Line', price: '50,000 PLN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3KNYMCTrvLQ1_8oL0DDJEmDpIy_yidwkYw&s' },
    { id: 10, title: 'BMW 3 Series', price: '60,000 PLN', image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImhtZXo0OWNpenl1ZzItT1RPTU9UT1BMIn0.6OBLh5YS5om4q5OpcAQvRr-__m6ygqGoEaXB2uPUJU4/image;s=644x461' },
    { id: 11, title: 'Mercedes C-Class', price: '70,000 PLN', image: 'https://devil-cars.pl/storage/images/FT4D2bLWZLPr62rKbf9wE49vclLe0GpLUEQJ7tWq.jpg' },
    { id: 12, title: 'Toyota Corolla', price: '40,000 PLN', image: 'https://storage.googleapis.com/auto-planeta-prod.appspot.com/vehicles/ncDddPfjNwrcR7iGZvqG/thumb_1740660434973_Projekt%20bez%20nazwy%28810%29.webp?GoogleAccessId=ap-prod%40auto-planeta-prod.iam.gserviceaccount.com&Expires=32503680000&Signature=AuFC5Ax5gqBTALSXewGkChsyIj4XsB6OKTWR0s5ujzq0%2BUURIgEgczsGhuB0xjuTcW5CeDSatFtpwVz7L5HhPxWdey%2FzautjcgQsnrQh17cdVzwukj4kWIl6gTak5d%2BkxXQpV1D3U8wmy22v5aLnZ0jUaeRf%2BYEVrfhegXIsqd7Z%2FI7F96YnAduPRHRJzBeLOAkFyN3EpTpQhrpl8ahCzOe52roOvAfSZwq7bW%2F0SasPCdqQuurRfgJvzOPgYqX20kmFM0eVFco823IHJmsdf4NwGvcXO8QQPRhCbFCC7nSjK3mvNxFMHPWdsvKHFlTobzzX%2BzrxSSEGV7kFfx0ojg%3D%3D' },

];

const OfferList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const offersPerPage = 8;

    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffers = offersData.slice(indexOfFirstOffer, indexOfLastOffer);

    const totalPages = Math.ceil(offersData.length / offersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="offer-list">
            {currentOffers.map((offer) => (
                <div key={offer.id} className="offer-card">
                    <div className="offer-list-horizontal-container">
                        <img src={offer.image} alt={offer.title}/>
                        <div className="offer-list-vertical-container">

                            <h3 className="offer-title">{offer.title}</h3>
                            <p className="offer-location">
                                Warszawa, Ursynów - 05 marca 2025 <br/>
                                2018 - 188 000 km
                            </p>
                        </div>

                        <p className="offer-price">{offer.price}</p>

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
