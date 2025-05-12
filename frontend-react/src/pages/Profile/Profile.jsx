import React from 'react';
import './Profile.css'
import Header from "../../components/Header/Header.jsx";
import { FaIdCard } from "react-icons/fa";

function Profile() {
    return (
        <div>
            <Header/>
            <div className="profile-page-container">


                    <div className="profile-container">
                        <div className="profile-horizontal-container">

                            <p className="profile-title">
                                Dane <br/>
                                użytkownika
                            </p>
                            <FaIdCard className="id-icon"  />
                        </div>

                        <p className="profile-category-text">
                            E-mail:
                        </p>
                        <p className="profile-data-text">
                            jankowalski@gmail.com
                        </p>
                        <p className="profile-category-text">
                            Numer telefonu:
                        </p>
                        <p className="profile-data-text">
                            +48 632 435 235
                        </p>
                        <p className="profile-category-text">
                            Imię:
                        </p>
                        <p className="profile-data-text">
                            Jan
                        </p>
                        <p className="profile-category-text">
                            Nazwisko:
                        </p>
                        <p className="profile-data-text">
                            Kowalski
                        </p>
                        <button className="profile-ok-button">
                            OK
                        </button>

                    </div>
                </div>


            </div>
            );
}

export default Profile;
