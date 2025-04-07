import React from 'react';
import './Filter.css';

const Filter = () => {
    return (
        <filter className="filter">
            <p className="filter-title">Filtry</p>
            <p className="filter-category-title">Kategoria</p>
            <input className="filter-input-data" type={"text"}/>
            <p className="filter-category-title">Podkategoria</p>
            <input className="filter-input-data" type={"text"}/>
            <p className="filter-category-title">Marka</p>
            <input className="filter-input-data" type={"text"}/>
            <p className="filter-category-title">Model</p>
            <input className="filter-input-data" type={"text"}/>
            <p className="filter-category-title">Cena</p>
            <div className="horizontal-container">
                <input className="filter-input-data" type={"text"}/>
                <input className="filter-input-data" type={"text"}/>
            </div>
            <p className="filter-category-title">Rok produkcji</p>
            <div className="horizontal-container">
                <input className="filter-input-data" type={"text"}/>
                <input className="filter-input-data" type={"text"}/>
            </div>
            <p className="filter-category-title">Pojemność silnika</p>
            <div className="horizontal-container">
                <input className="filter-input-data" type={"text"}/>
                <input className="filter-input-data" type={"text"}/>
            </div>
            <p className="filter-category-title">Przebieg</p>
            <div className="horizontal-container">
                <input className="filter-input-data" type={"text"}/>
                <input className="filter-input-data" type={"text"}/>
            </div>
            <p className="filter-category-title">Paliwo</p>
            <input className="filter-input-data" type={"text"}/>
            <p className="filter-category-title">Stan techniczny</p>
            <input className="filter-input-data" type={"text"}/>
        </filter>
    );
};

export default Filter;
