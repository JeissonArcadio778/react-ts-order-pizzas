import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/userApi';
import './styles/UserProfileStyles.css';

interface UserProfileData {
  email: string;
  email_verified: string;
  phone_number: string;
  phone_number_verified: string;
  name: string;
  address: string;
  sub: string;
}

export const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData>({
    email: '',
    email_verified: '',
    phone_number: '',
    phone_number_verified: '',
    name: '',
    address: '',
    sub: ''
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const clientEmail = localStorage.getItem('client_email');
      if (clientEmail) {
        const profileData = await getUserProfile(clientEmail);
        setProfile(profileData.userAttributes);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientEmail = localStorage.getItem('client_email');
    if (clientEmail) {
      await updateUserProfile(clientEmail, {
        name: profile.name,
        email: profile.email,
        address: profile.address,
        phoneNumber: profile.phone_number
      });
      setShowModal(true);
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil del Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} required />
        <label>Dirección:</label>
        <input type="text" name="address" value={profile.address} onChange={handleChange} required />
        <label>Teléfono:</label>
        <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} required />
        <button type="submit">Actualizar Perfil</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Perfil actualizado con éxito</h3>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};