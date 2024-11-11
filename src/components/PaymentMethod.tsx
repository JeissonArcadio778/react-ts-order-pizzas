import React, { useState } from 'react';
import './styles/PaymentMethodStyles.css';

export const PaymentMethod: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment details:', { cardNumber, expiryDate, cvv, cardName });
    // Add payment processing logic here
  };

  return (
    <div className="form-container">
      <h2>Método de pago</h2>
      <form onSubmit={handlePaymentSubmit}>
        <label>Número de tarjeta</label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={19}
        />
        
        <div className="inline-fields">
          <div className="field">
            <label>Fecha de vencimiento</label>
            <input
              type="text"
              placeholder="MM/AA"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              maxLength={5}
            />
          </div>
          <div className="field">
            <label>Código de seguridad (CVV)</label>
            <input
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
            />
          </div>
        </div>
        
        <label>Nombre en la tarjeta</label>
        <input
          type="text"
          placeholder="Nombre en la tarjeta"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        
        <button type="submit" className="submit-button">Acepta y continúa</button>
      </form>
    </div>
  );
};
