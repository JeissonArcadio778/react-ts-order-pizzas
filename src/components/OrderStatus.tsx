import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getOrderStatus } from '../api/orderApi';
import "./styles/OrderStatus.css";
import papaTomandoOrden from './assets/images/papa-tomando-orden.png';
import papaCocinera from './assets/images/papa-cocinera.png';
import papaReady from './assets/images/papa-ready.png';

/**
 * Componente que muestra el estado de un pedido.
 * 
 * @param orderId - El ID del pedido.
 * @returns El componente de estado del pedido.
 */
interface OrderInfo {
  name: string;
  address: string;
  order_id: string;
  delivery_status: string;
}

export const OrderStatus = () => {
  const location = useLocation();
  const { orderId } = location.state;
  const [status, setStatus] = useState("CREATING_ORDER");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const accessToken = localStorage.getItem('access_token');
      console.log('Access token:', accessToken);
      if (!accessToken) {
        console.error('Access token not found in local storage');
        return;
      }

      try {
        const response = await getOrderStatus(orderId, accessToken);
        const orderData = response.order;
        setStatus(orderData.delivery_status);
        setOrderInfo({
          name: orderData.clientName,
          address: orderData.address,
          order_id: orderData.orderId,
          delivery_status: orderData.delivery_status,
        });
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    // Initial call and interval for polling status updates
    fetchOrderStatus();
    const intervalId = setInterval(fetchOrderStatus, 10000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  const renderOrderStatusContent = () => {
    switch (status) {
      case "CREATING_ORDER":
        return (
          <StatusModal 
            status="Estado: Creando Pedido" 
            message="Por favor espera..." 
            imageSrc={papaTomandoOrden}
          >
            <div className="loader"></div>
          </StatusModal>
        );
      case "PREPARING":
        return (
          <StatusModal 
            status="Estado: Preparando tu Pedido" 
            message="Por favor espera..." 
            imageSrc={papaCocinera}
          >
            <div className="loader"></div>
          </StatusModal>
        );
      case "READY_FOR_DELIVERY":
        return (
          <StatusModal 
            status="Estado: Pedido listo para entrega" 
            imageSrc={papaReady}
          >
            <div className="order-summary">
              <p>Información del pedido:</p>
              <p>Nombre: {orderInfo?.name || 'xxxxxxxx'}</p>
              <p>Dirección: {orderInfo?.address || 'xxxxxxxx'}</p>
              <p>Orden del pedido: {orderInfo?.order_id || 'xxxxxxxx'}</p>
              <p>¡Gracias por tu compra!</p>
            </div>
          </StatusModal>
        );
      default:
        return <p>Estado desconocido</p>;
    }
  };

  return (
    <div className="order-status-container">
      {renderOrderStatusContent()}
    </div>
  );
};

const StatusModal = ({ status, message, imageSrc, children }: { status: string; message?: string; imageSrc: string; children: React.ReactNode }) => {
  return (
    <div className="modal">
      <div className="modal-content show">
        <h2>{status}</h2>
        {imageSrc && <img src={imageSrc} alt="Order Status" className="status-image" />}
        {message && <p>{message}</p>}
        {children}
      </div>
    </div>
  );
};