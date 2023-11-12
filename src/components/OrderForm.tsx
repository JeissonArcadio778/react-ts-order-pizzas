import React, { useState } from "react";
import { createOrder } from "../api/orderApi";

export const OrderForm = ({
  onOrderCreated,
}: {
  onOrderCreated: (orderId: string) => void;
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pizzas, setPizzas] = useState<string[]>([]);
  const pizzaOptions = ["Hawillana", "Champiñones", "Pepperoni", "Vegetariana"];

  const handlePizzaSelection = (selectedPizza: string) => {
    if (pizzas.includes(selectedPizza)) {
      setPizzas(pizzas.filter((pizza) => pizza !== selectedPizza));
    } else {
      setPizzas([...pizzas, selectedPizza]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createOrder({ name, address, pizzas });

      const orderId = response.data.message.split(" ")[8];
      onOrderCreated(orderId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {pizzaOptions.map((pizza) => (
        <label key={pizza}>
          <input
            type="checkbox"
            checked={pizzas.includes(pizza)}
            onChange={() => handlePizzaSelection(pizza)}
          />
          {pizza}
        </label>
      ))}
      <button type="submit">Enviar Pedido</button>
    </form>
  );
};
