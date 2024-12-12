import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/NavBarStyles.css';

export const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const userRole = localStorage.getItem('client_role');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link brand">Mandiricas</Link>
      </div>
      <div className="navbar-links">
        {userRole === 'Clients' && <Link to="/order" className="nav-link button-link">Hacer Pedido</Link>}
        {userRole === 'Clients' && <Link to="/purchase-history" className="nav-link button-link">Historial de Pedidos</Link>}
        <Link to="/profile" className="nav-link button-link">Perfil</Link>
        {(userRole === 'Administrators' || userRole === 'Cooks') && <Link to="/admin" className="nav-link button-link">Admin</Link>}
        <button onClick={logout} className="nav-link logout-button">Cerrar Sesión</button>
      </div>
    </nav>
  );
};