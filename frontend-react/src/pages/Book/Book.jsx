import React from 'react';
import './Book.css'
import Header from "../../components/Header/Header.jsx";
import { Checkbox } from 'antd';
import dayjs from 'dayjs';

function Book() {

    return (
        <div>
            <Header/>
            <div className="book-page-container">
                <div className="book-container">
                    <p className="book-title">Umów się na jazdę próbną...</p>


                    <div className="book-offer-card">
                        <div className="book-offer-horizontal-container">
                            <img src="" alt=""/>
                            <div className="book-offer-vertical-container">
                                <h3 className="book-offer-title">Tytuł oferty</h3>
                                <p className="book-offer-location">
                                    Warszawa, Ursynów – 05 marca 2025<br/>
                                    2018 – 188 000 km
                                </p>
                            </div>
                            <p className="book-offer-price">61 900 PLN</p>
                        </div>
                    </div>
                    <div className="book-date-horizontal-container">
                        <div>
                            <p className="book-text">
                                Data:
                            </p>
                            <div className="book-checkbox-vertical-container">

                                <Checkbox className="book-checkbox">{dayjs().format('DD MMMM YYYY')}</Checkbox>;
                                <Checkbox
                                    className="book-checkbox">{dayjs().add(1, 'day').format('DD MMMM YYYY')}</Checkbox>;
                                <Checkbox
                                    className="book-checkbox">{dayjs().add(2, 'day').format('DD MMMM YYYY')}</Checkbox>;
                            </div>

                        </div>
                        <div>

                            <p className="book-text">
                                Godzina:
                            </p>
                            <div className="book-checkbox-vertical-container">
                                <Checkbox className="book-checkbox">16:00 - 16:45</Checkbox>;
                                <Checkbox className="book-checkbox">17:00 - 17:45</Checkbox>;
                                <Checkbox className="book-checkbox">18:00 - 18:45</Checkbox>;

                            </div>
                        </div>

                    </div>

                    <button className="book-confirm-button">
                        Potwierdzam
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Book;
