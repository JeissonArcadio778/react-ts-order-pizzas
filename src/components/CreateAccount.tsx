import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';
import './styles/CreateAccountStyles.css';

export const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Clients');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, role });
      setMessage('Registro exitoso. Por favor, verifica tu correo electrónico para confirmar tu cuenta.');
      navigate('/confirm-account');
    } catch (error) {
      setMessage('Hubo un error en el registro. Intenta nuevamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};