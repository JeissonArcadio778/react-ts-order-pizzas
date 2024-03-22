import { useState, useEffect } from "react";
import { getOrderStatus } from "../api/orderApi";
import { OrderModal } from "./OrderModal";

import "./styles/OrderStatus.css";

/**
 * Componente que muestra el estado de un pedido.
 * 
 * @param orderId - El ID del pedido.
 * @returns El componente de estado del pedido.
 */
export const OrderStatus = ({ orderId }: { orderId: string }) => {
  const [status, setStatus] = useState("CREATING_ORDER");
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await getOrderStatus(orderId);
        setStatus(response.delivery_status);
        setOrderInfo(response);
      } catch (error) {
        console.error(error);
      }
    };

    // Realizar la primera llamada inmediatamente y luego establecer un intervalo
    fetchOrderStatus();
    const intervalId = setInterval(fetchOrderStatus, 10000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  const renderOrderStatusContent = () => {
    switch (status) {
      case "CREATING_ORDER":
        return (
          <>
            <p>Creando tu pedido...</p>
            <p>Espera un momento mientras procesamos tu orden.</p>
            <div className="loader"></div>
          </>
        );
      case "PREPARING":
        return (
          <>
            <p>Preparando tu pedido...</p>
            <div className="loader"></div>
          </>
        );
      case "READY_FOR_DELIVERY":
        return <OrderModal orderInfo={orderInfo} />;
      default:
        return <p>Creando Pedido... Espera unos segundos</p>;
    }
  };

  return (
    <StatusModal status={status}>
      {renderOrderStatusContent()}
    </StatusModal>
  );
};

export const PreparingOrder = () => {
  return (
    <div className="order-status">
      <p>Preparando tu pedido...</p>
      <div className="loader"></div>
    </div>
  );
};

export const StatusModal = ({ status, children }: { status: string, children: React.ReactNode }) => {
  return (
    <div className="modal">
      <div className={`modal-content ${status !== 'CREATING_ORDER' ? 'show' : ''}`}>
        <h2>Estado del Pedido: {traducirEstado(status)}</h2>
        {children}
      </div>
    </div>
  );
};

const traducirEstado = (estado: string) => {
  switch (estado) {
    case 'CREATING_ORDER':
      return 'Creando Pedido';
    case 'PREPARING':
      return 'Preparando';
    case 'READY_FOR_DELIVERY':
      return 'Listo para Entrega';
    default:
      return 'Creando Pedido';
  }
};
