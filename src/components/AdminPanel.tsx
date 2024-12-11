import React, { useState, useEffect } from "react";
import { getAllOrders } from "../api/orderApi"; // Asegúrate de que exista esta función
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

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

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
          <option value="READY_FOR_DELIVERY">Listo</option>
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
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <h3>Pedido: {order.orderId}</h3>
              <p>Cliente: {order.clientEmail}</p>
              <p>Estado: {order.status}</p>
              <p>Fecha: {order.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron pedidos.</p>
        )}
      </div>
    </div>
  );
};
