import React from 'react';
import './Offer.css';
import Header from "../../components/Header/Header.jsx";
import { Carousel } from "antd";
import { LuWalletMinimal } from "react-icons/lu";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { PiMagnifyingGlassBold } from "react-icons/pi";


const images = [
    'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImhtZXo0OWNpenl1ZzItT1RPTU9UT1BMIn0.6OBLh5YS5om4q5OpcAQvRr-__m6ygqGoEaXB2uPUJU4/image;s=644x461',
    'https://devil-cars.pl/storage/images/FT4D2bLWZLPr62rKbf9wE49vclLe0GpLUEQJ7tWq.jpg',
    'https://storage.googleapis.com/auto-planeta-prod.appspot.com/vehicles/ncDddPfjNwrcR7iGZvqG/thumb_1740660434973_Projekt%20bez%20nazwy%28810%29.webp?GoogleAccessId=ap-prod%40auto-planeta-prod.iam.gserviceaccount.com&Expires=32503680000&Signature=AuFC5Ax5gqBTALSXewGkChsyIj4XsB6OKTWR0s5ujzq0%2BUURIgEgczsGhuB0xjuTcW5CeDSatFtpwVz7L5HhPxWdey%2FzautjcgQsnrQh17cdVzwukj4kWIl6gTak5d%2BkxXQpV1D3U8wmy22v5aLnZ0jUaeRf%2BYEVrfhegXIsqd7Z%2FI7F96YnAduPRHRJzBeLOAkFyN3EpTpQhrpl8ahCzOe52roOvAfSZwq7bW%2F0SasPCdqQuurRfgJvzOPgYqX20kmFM0eVFco823IHJmsdf4NwGvcXO8QQPRhCbFCC7nSjK3mvNxFMHPWdsvKHFlTobzzX%2BzrxSSEGV7kFfx0ojg%3D%3D',
];

function Offer() {
    return (
        <div>
            <div className="offer-page-container">
                <Header />
                <div className="offer-horizontal-container">
                    <div className="offer-vertical-container">
                        <div className="offer-img-container">
                            <Carousel arrows infinite={false}>
                                {images.map((src, idx) => (
                                    <div key={idx}>
                                        <img src={src} alt={`car-${idx}`} style={{objectFit: 'cover'}}/>
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
                                BMW F31 LIFT LCI 2.0D
                                <br />
                                <br />SPORT LINE
                                <br />Silnik 2.0 B47 Automat 8 BIEGÓW
                                <br />
                                <br />ATRAKCYJNE WYPOSAŻENIE!!!
                                <br />CENA DO LEKKIEJ NEGOCJACJI
                                <br />
                            </p>
                        </div>
                    </div>

                    <div className="offer-panel-container">
                        <p className="offer-panel-title">BMW Seria 3 318d Sport Line</p>
                        <p className="offer-panel-price">61 900 PLN</p>
                        <div className="offer-buy-button">
                            <LuWalletMinimal className="buy-icon" />
                        </div>
                        <div className="offer-contact-button">
                            <HiDevicePhoneMobile className="contact-icon" />
                        </div>
                        <div className="offer-information-container">
                            <p className="offer-information-title">Informacje</p>
                            <p className="offer-information-text">
                                * 2018
                                <br />* Używany
                                <br />* 188 000 km
                                <br />* Diesel
                                <br />* Kombi
                                <br />* 1 995 cm^3
                                <br />* 150 KM
                                <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offer;
