import React, { useState, useEffect } from 'react';
import './Filter.css';
import { useAuth } from '../../../context/AuthContext.jsx';

const Filter = ({ onFilterChange, setSharedData }) => {
    const { api } = useAuth();
    const [marks, setMarks] = useState([]);
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [filters, setFilters] = useState({
        productionYear: '',
        registrationNumber: '',
        colour: '',
        vin: '',
        fuelType: '',
        engineCapacity: '',
        condition: '',
        power: '',
        mileage: 0,
        mark: '',
        model: '',
        type: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const [marksRes, modelsRes, typesRes] = await Promise.all([
                api.get('/mark'),
                api.get('/model'),
                api.get('/type')
            ]);
            setMarks(marksRes.data);
            setModels(modelsRes.data);
            setTypes(typesRes.data);
            if (setSharedData) {
                setSharedData.setMarks(marksRes.data);
                setSharedData.setModels(modelsRes.data);
                setSharedData.setTypes(typesRes.data);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'mark' ? { model: '' } : {})
        }));
    };

    const filteredModels = filters.mark
        ? models.filter(m => {
            const markObj = marks.find(mark => mark.name === filters.mark);
            return m.markId === markObj?.id;
        })
        : models;

    return (
        <div className="filter">
            <p className="filter-title">Filtry</p>

            <p className="filter-category-title">Marka</p>
            <select className="filter-input-data" name="mark" value={filters.mark} onChange={handleChange}>
                <option value="">-- wybierz --</option>
                {marks.map(mark => (
                    <option key={mark.id} value={mark.name}>{mark.name}</option>
                ))}
            </select>

            <p className="filter-category-title">Model</p>
            <select className="filter-input-data" name="model" value={filters.model} onChange={handleChange}>
                <option value="">-- wybierz --</option>
                {filteredModels.map(model => (
                    <option key={model.id} value={model.name}>{model.name}</option>
                ))}
            </select>

            <p className="filter-category-title">Typ pojazdu</p>
            <select className="filter-input-data" name="type" value={filters.type} onChange={handleChange}>
                <option value="">-- wybierz --</option>
                {types.map(type => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                ))}
            </select>
            <p className="filter-category-title">Kolor</p>
            <select className="filter-input-data" name="colour" value={filters.colour} onChange={handleChange}>
                <option value="">-- wybierz --</option>
                {["Czerwony", "Niebieski", "Czarny", "Biały", "Srebrny", "Szary", "Fioletowy"].map(colour => (
                    <option key={colour} value={colour}>{colour}</option>
                ))}
            </select>

            <p className="filter-category-title">Paliwo</p>
            <select className="filter-input-data" name="fuelType" value={filters.fuelType} onChange={handleChange}>
                <option value="">-- wybierz --</option>
                {["Gaz", "Diesel", "Elektryczny", "Hybryda", "Benzyna"].map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <p className="filter-category-title">Stan</p>
            <select className="filter-input-data" name="condition" value={filters.condition} onChange={handleChange}>
                <option value="">-- wybierz --</option>
                {['Nowy', 'Używany'].map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                ))}
            </select>
            <p className="filter-category-title">Przebieg do {filters.mileage || 'dowolny'} km</p>
            <input
                className="filter-input-data"
                type="range"
                name="mileage"
                min="0"
                max="350000"
                step="1000"
                value={filters.mileage}
                onChange={handleChange}
            />

            <p className="filter-category-title">Rok produkcji do {filters.productionYear || 'dowolny'}</p>
            <input
                className="filter-input-data"
                type="range"
                name="productionYear"
                min="2000"
                max={new Date().getFullYear()}
                step="1"
                value={filters.productionYear}
                onChange={handleChange}
            />

            <p className="filter-category-title">Pojemność silnika do {filters.engineCapacity || 'dowolna'} cm³</p>
            <input
                className="filter-input-data"
                type="range"
                name="engineCapacity"
                min="500"
                max="7000"
                step="100"
                value={filters.engineCapacity}
                onChange={handleChange}
            />

            <p className="filter-category-title">Moc silnika do {filters.power || 'dowolna'} KM</p>
            <input
                className="filter-input-data"
                type="range"
                name="power"
                min="40"
                max="1000"
                step="10"
                value={filters.power}
                onChange={handleChange}
            />

        </div>
    );
};

export default Filter;