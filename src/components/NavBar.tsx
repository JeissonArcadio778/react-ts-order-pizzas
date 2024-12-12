import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/NavBarStyles.css';

export const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const userRole = localStorage.getItem('client_role');

  return (
    <nav className="navbar">
      {userRole === 'Client' && <Link to="/order" className="nav-link">Hacer Pedido</Link>}
      {userRole === 'Client' && <Link to="/purchase-history" className="nav-link">Historial de Pedidos</Link>}
      <Link to="/profile" className="nav-link">Perfil</Link>
      {(userRole === 'Administrators' || userRole === 'Cooks') && <Link to="/admin" className="nav-link">Admin</Link>}
      <button onClick={logout} className="nav-link">Cerrar Sesión</button>
    </nav>
  );
};