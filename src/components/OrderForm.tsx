import React from 'react';
import './styles/OrderFormStyles.css';

import salchipapaClasica from './assets/images/Salchipapa_clasica_o_sencilla.png';
import salchipapaPerro from './assets/images/salchipapa_perro_o_hamburguesa.png';
import salchipapaQueso from './assets/images/salchipapa_mas_queso.png';
import dosSalchipapas from './assets/images/dos_salchipapas.png';

interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

const orderItems: OrderItem[] = [
  { id: 1, name: 'Salchipapa clásica o sencilla', description: 'Salchipapa clásica o sencilla', price: '$5,000', imageUrl: salchipapaClasica },
  { id: 2, name: 'Salchipapa + Gaseosa + Hamburguesa/Perro', description: 'Salchipapa + Gaseosa + Hamburguesa o Perro', price: '$10,000', imageUrl: salchipapaPerro },
  { id: 3, name: 'Salchipapa + Gaseosa + Deditos de queso/Nuggets', description: 'Salchipapa + Gaseosa + Deditos de queso o Nuggets', price: '$12,000', imageUrl: salchipapaQueso },
  { id: 4, name: 'Salchipapa especial (2x1) + Gaseosa + Cebollas caramelizadas', description: 'Salchipapa especial (2x1) + Gaseosa + Cebollas caramelizadas', price: '$15,000', imageUrl: dosSalchipapas },
];

export const Order: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted');
  };

  return (
    <div className="form-container">
      <h2>Crea tu pedido</h2>
      <div className="order-items">
        {orderItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-description">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="item-details">
              <img src={item.imageUrl} alt={item.name} />
              <span className="price">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Enviar</button>
    </div>
  );
};