import React from 'react';
import './AddOffer.css'
import Header from "../../components/Header/Header.jsx";
import { RiFileAddFill } from "react-icons/ri";


function AddOffer() {

    return (
        <div>
            <Header/>
            <div className="add-offer-page-container">
                <div className="add-offer-container">
                    <p className="add-offer-title">Dodaj ogłoszenie</p>

                    <div className="add-offer-horizontal-container">

                        <div className="add-offer-vertical-container">
                            <p className="add-offer-category-text">Kategoria</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Podkategoria</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Marka</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Model</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Opis</p>
                            <textarea
                                className="add-offer-big-input"
                                placeholder="…"
                            />


                        </div>

                        <div className="add-offer-vertical-container">
                            <p className="add-offer-category-text">Cena</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Rok produkcji</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Pojemność silnika</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Paliwo</p>
                            <input
                                className="add-offer-input"
                            />
                            <p className="add-offer-category-text">Stan techniczny</p>
                            <input
                                className="add-offer-input"
                            /></div>

                        <div className="add-offer-vertical-container">
                            <p className="add-offer-category-text">Podgląd</p>

                            <img
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400"
                                alt="Sportowy samochód na drodze"
                            />
                            <RiFileAddFill className="add-icon"/>


                        </div>

                    </div>
                    <button className="add-offer-confirm-button">
                        OK
                    </button>
                </div>
            </div>


        </div>
    );
}

export default AddOffer;
