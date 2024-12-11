import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../api/orderApi";
import "./styles/AdminPanelStyles.css";

export const AdminPanel: React.FC = () => {
  interface Order {
    orderId: string;
    clientEmail: string;
    status: string;
    createdAt: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
    clientEmail: "",
  });

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(filters);
      setOrders(response.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSendOrder = async (orderId: string) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('Access token not found in local storage');
        return;
      }
      await updateOrderStatus(orderId, accessToken);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "ENVIADO" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <div className="filters">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
          placeholder="Fecha Inicio"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
          placeholder="Fecha Fin"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
        >
          <option value="">Todos</option>
          <option value="PENDING">Pendiente</option>
          <option value="DELIVERED">Entregado</option>
        </select>
        <input
          type="email"
          name="clientEmail"
          value={filters.clientEmail}
          onChange={handleInputChange}
          placeholder="Email del Cliente"
        />
        <button onClick={fetchOrders}>Aplicar Filtros</button>
      </div>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId} className="order-item">
              <h3>Pedido: {order.orderId}</h3>
              <p>Cliente: {order.clientEmail}</p>
              <p>Estado: {order.status}</p>
              <p>Fecha: {order.createdAt}</p>
              {order.status === "PENDING" && (
                <button onClick={() => handleSendOrder(order.orderId)}>
                  Enviar Pedido
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron pedidos.</p>
        )}
      </div>
    </div>
  );
};