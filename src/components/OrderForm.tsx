import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orderApi';
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
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleItemSelect = (item: OrderItem) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
      setTotalPrice(totalPrice - parseInt(item.price.replace('$', '').replace(',', '')));
    } else {
      setSelectedItems([...selectedItems, item]);
      setTotalPrice(totalPrice + parseInt(item.price.replace('$', '').replace(',', '')));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Debes seleccionar al menos un producto para continuar con el pedido.');
      return;
    }

    const clientEmail = localStorage.getItem('client_email');
    const accessToken = localStorage.getItem('access_token');
    if (!clientEmail || !accessToken) {
      console.error('Client email or access token not found in local storage');
      return;
    }

    const orderData = {
      address,
      client_name: clientName,
      client_email: clientEmail,
      salchipapas: selectedItems.map(item => ({
        type: item.name,
        potatoes: 'Criollas',
        sausages: 'Pollo', 
        sauces: ['Mayonesa', 'Ketchup'],
        drink: 'Coca Cola',
        extras: ['Queso', 'Huevo de codorniz'],
        quantity: 1
      })),
      totalPrice
    };

    try {
      const response = await createOrder(orderData, accessToken);
      console.log('Order submitted:', response);
      navigate('/status', { state: { orderId: response.order.orderId } });
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Crea tu pedido</h2>
      <div className="order-items">
        {orderItems.map((item) => (
          <div key={item.id} className={`order-item ${selectedItems.includes(item) ? 'selected' : ''}`} onClick={() => handleItemSelect(item)}>
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
      <button className="submit-button" onClick={() => setShowModal(true)}>Continuar</button>
      <button className="history-button" onClick={() => navigate('/purchase-history')}>Historial de Pedidos</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Pedido</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre del Cliente:</label>
              <input
                type="text"
                placeholder="Nombre del Cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <label>Dirección:</label>
              <input
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="selected-items">
                <h3>Productos Seleccionados:</h3>
                {selectedItems.map(item => (
                  <div key={item.id} className="selected-item">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="total-price">
                <h3>Total: ${totalPrice.toLocaleString()}</h3>
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit">Confirmar Pedido</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};