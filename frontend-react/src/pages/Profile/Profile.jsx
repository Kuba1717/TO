import React, { useEffect, useState } from 'react';
import './Profile.css';
import Header from "../../components/Header/Header.jsx";
import { FaIdCard } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

function Profile() {
    const { user, api } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) return;

            try {
                const response = await api.get(`/user/${user.email}`);
                setProfileData(response.data);
                setFormData({
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    phoneNumber: response.data.phoneNumber || '',
                    email: response.data.email
                });
            } catch (err) {
                setError('Nie udało się pobrać danych użytkownika.');
                console.error(err);
            }
        };

        fetchProfileData();
    }, [user, api]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = async () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            try {
                await api.put(`/user/${user.email}`, formData); // PUT z e-mailem
                setProfileData(prev => ({ ...prev, ...formData }));
                setIsEditing(false);
            } catch (err) {
                setError('Nie udało się zaktualizować danych.');
                console.error(err);
            }
        }
    };

    if (error) return <div>{error}</div>;
    if (!profileData) return <div>Ładowanie danych...</div>;

    return (
        <div>
            <Header />
            <div className="profile-page-container">
                <div className="profile-container">
                    <div className="profile-horizontal-container">
                        <p className="profile-title">Dane <br /> użytkownika</p>
                        <FaIdCard className="id-icon" />
                    </div>

                    <p className="profile-category-text">E-mail:</p>
                    <p className="profile-data-text">{profileData.email}</p>

                    <p className="profile-category-text">Numer telefonu:</p>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="profile-input"
                        />
                    ) : (
                        <p className="profile-data-text">{profileData.phoneNumber || 'Uzupełnij dane'}</p>
                    )}

                    <p className="profile-category-text">Imię:</p>
                    {isEditing ? (
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="profile-input"
                        />
                    ) : (
                        <p className="profile-data-text">{profileData.firstName || 'Uzupełnij dane'}</p>
                    )}

                    <p className="profile-category-text">Nazwisko:</p>
                    {isEditing ? (
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="profile-input"
                        />
                    ) : (
                        <p className="profile-data-text">{profileData.lastName || 'Uzupełnij dane'}</p>
                    )}

                    <button className="profile-edit-button" onClick={handleEditClick}>
                        {isEditing ? 'Zapisz' : 'Edytuj'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
