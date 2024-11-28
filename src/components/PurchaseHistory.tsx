import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchaseHistory } from '../api/orderApi';
import './styles/PurchaseHistoryStyles.css';

interface Order {
  clientName: string;
  totalPrice: number;
  clientEmail: string;
  orderId: string;
  status: string;
  delivery_status: string;
  createdAt: string;
  address: string;
  salchipapas: Array<{
    sauces: string[];
    potatoes: string;
    quantity: number;
    extras: string[];
    type: string;
    sausages: string;
    drink: string;
  }>;
}

export const PurchaseHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const clientEmail = localStorage.getItem('client_email');
      console.log('clientEmail:', clientEmail);
      const accessToken = localStorage.getItem('access_token');
      if (!clientEmail || !accessToken) {
        console.error('Client email or access token not found in local storage');
        return;
      }

      try {
        const response = await getPurchaseHistory(clientEmail, accessToken);
        setOrders(response.orders);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Historial de Pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos en el historial.</p>
      ) : (
        orders.map(order => (
          <div key={order.orderId} className="order-card">
            <h3>Pedido ID: {order.orderId}</h3>
            <p>Cliente: {order.clientName}</p>
            <p>Correo: {order.clientEmail}</p>
            <p>Dirección: {order.address}</p>
            <p>Estado: {order.status}</p>
            <p>Estado de Entrega: {order.delivery_status}</p>
            <p>Fecha: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total: ${order.totalPrice}</p>
            <h4>Productos:</h4>
            {order.salchipapas.map((item, index) => (
              <div key={index} className="order-item">
                <p>Tipo: {item.type}</p>
                <p>Papas: {item.potatoes}</p>
                <p>Salchichas: {item.sausages}</p>
                <p>Salsas: {item.sauces.join(', ')}</p>
                <p>Bebida: {item.drink}</p>
                <p>Extras: {item.extras.join(', ')}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
      <button className="back-button" onClick={() => navigate('/order')}>Volver</button>
    </div>
  );
};