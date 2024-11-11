import React, { useState } from 'react';
import './styles/CreateAccountStyles.css';

export const CreateAccount: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mocked submission action
    console.log('Account created:', { name, email, address });
    // Redirect or clear form as needed
  };

  return (
    <div className="form-container">
      <h2>Bienvenido a Mandiricas</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Dirección:</label>
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
