import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPageStyles.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="form-container">
      <h1>BIENVENIDOS A MANDIRICAS</h1>
      <div className="image-placeholder">
        <img src={require('./assets/images/mandiricas-logo.png')} alt="Welcome to Mandiricas" />
      </div>
      <div className="button-group">
        <Link to="/create-account" className="btn">Crear Cuenta</Link>
        <Link to="/login" className="btn">Iniciar Sesión</Link>
      </div>
    </div>
  );
};
