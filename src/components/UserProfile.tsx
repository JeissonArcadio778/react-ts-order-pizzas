import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/userApi';
import './styles/UserProfileStyles.css';

export const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const clientEmail = localStorage.getItem('client_email');
      if (clientEmail) {
        const profileData = await getUserProfile(clientEmail);
        setProfile(profileData);
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
      await updateUserProfile(clientEmail, profile);
      alert('Perfil actualizado con éxito');
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
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />
        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
};