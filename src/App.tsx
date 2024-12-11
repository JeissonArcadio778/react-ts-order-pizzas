import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { CreateAccount } from './components/CreateAccount';
import { Login } from './components/Login';
import { ConfirmAccount } from './components/ConfirmationAccount';
import { PurchaseHistory } from './components/PurchaseHistory';
import { Order } from './components/OrderForm';
import { PaymentMethod } from './components/PaymentMethod';
import { OrderStatus } from './components/OrderStatus';
import { AdminPanel } from './components/AdminPanel';

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles: string[] }> = ({ children, roles }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('client_role');

  useEffect(() => {
    if (!userRole || !roles.includes(userRole)) {
      navigate('/');
    }
  }, [navigate, roles, userRole]);

  console.log('User role:', userRole);
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute roles={['Client']}>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['Administrators']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/status" element={<OrderStatus />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
      </Routes>
    </Router>
  );
};

export default App;