import { useState } from 'react';
import { OrderForm } from './components/OrderForm';
import { OrderStatus } from './components/OrderStatus';

function App() {
    const [orderId, setOrderId] = useState('');

    const handleOrderCreated = (newOrderId: string) => {
        setOrderId(newOrderId);
    };

    return (
      <div>
      {!orderId ? (
          <OrderForm onOrderCreated={handleOrderCreated} />
      ) : (
          <OrderStatus orderId={orderId} />
      )}
  </div>
    );
}

export default App;
