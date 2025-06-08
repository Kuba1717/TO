import React, { useState } from 'react';
import './Main.css';
import Header from '../../components/Header/Header.jsx';
import Filter from '../../components/Main/Filter/Filter.jsx';
import OfferList from '../../components/Main/OfferList/OfferList.jsx';

function Main() {
    const [filters, setFilters] = useState({});
    const [marks, setMarks] = useState([]);
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);

    return (
        <div>
            <Header />
            <div className="main-horizontal-container">
                <Filter onFilterChange={setFilters} setSharedData={{ setMarks, setModels, setTypes }} />
                <OfferList filters={filters} marks={marks} models={models} types={types} />
            </div>
        </div>
    );
}

export default Main;