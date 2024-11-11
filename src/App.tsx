import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { CreateAccount } from './components/CreateAccount';
import { Login } from './components/Login';
// FOR TEST:
import { Order } from './components/OrderForm';
import { PaymentMethod } from './components/PaymentMethod';
import { OrderStatus } from './components/OrderStatus';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        {/* FOR TEST: */}
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/status" element={<OrderStatus orderId='123' />} />
      </Routes>
    </Router>
  );
};

export default App;
