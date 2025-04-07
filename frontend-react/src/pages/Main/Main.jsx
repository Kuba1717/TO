import React from 'react';
import './Main.css'
import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Main/Filter/Filter.jsx";
import OfferList from "../../components/Main/OfferList/OfferList.jsx";

function Main() {

    return (
        <div>
            <Header/>
            <div className="main-horizontal-container">
                <Filter/>
                <OfferList/>
            </div>


        </div>
    );
}

export default Main;
