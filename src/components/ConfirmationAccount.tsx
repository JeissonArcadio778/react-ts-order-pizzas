import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmUser } from '../api/userApi';
import './styles/CreateAccountStyles.css';

export const ConfirmAccount: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmUser(email, confirmationCode);
      setMessage('Cuenta confirmada exitosamente. Ahora puedes iniciar sesión.');
      navigate('/login', { state: { email } });
    } catch (error) {
      setMessage('Error en la confirmación. Por favor, verifica el código ingresado.');
    }
  };

  return (
    <div className="form-container">
      <h2>Confirmar Cuenta</h2>
      <form onSubmit={handleConfirm}>
        {!email && (
          <>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        <label>Código de Confirmación:</label>
        <input
          type="text"
          placeholder="Código de confirmación"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        <button type="submit">Confirmar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};