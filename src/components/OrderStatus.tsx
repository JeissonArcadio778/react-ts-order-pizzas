import React, { useState, useEffect } from "react";
import { getOrderStatus } from "../api/orderApi";
import { OrderModal } from "./OrderModal";

export const OrderStatus = ({ orderId }: { orderId: string }) => {
  const [status, setStatus] = useState("CREATING_ORDER");
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    let intervalId: any;

    const fetchOrderStatus = async () => {
      try {
        const response = await getOrderStatus(orderId);
        console.log(response);
        setStatus(response.delivery_status);
        setOrderInfo(response);

        if (response.delivery_status === "READY_FOR_DELIVERY") {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    intervalId = setInterval(fetchOrderStatus, 10000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  return (
    <div>
      Estado del Pedido: {status}
      {status === "READY_FOR_DELIVERY" && <OrderModal orderInfo={orderInfo} />}
    </div>
  );
};
