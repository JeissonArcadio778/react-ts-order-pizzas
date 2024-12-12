import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { CreateAccount } from './components/CreateAccount';
import { Login } from './components/Login';
import { ConfirmAccount } from './components/ConfirmationAccount';
import { PurchaseHistory } from './components/PurchaseHistory';
import { Order } from './components/OrderForm';
import { PaymentMethod } from './components/PaymentMethod';
import { OrderStatus } from './components/OrderStatus';
import { AdminPanel } from './components/AdminPanel';
import { UserProfile } from './components/UserProfile';
import { NavBar } from './components/NavBar';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles: string[] }> = ({ children, roles }) => {
  const { isAuthenticated } = useAuth();
  const userRole = localStorage.getItem('client_role');

  if (!isAuthenticated || !roles.includes(userRole || '')) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={isAuthenticated ? <Navigate to="/" /> : <CreateAccount />} />
        <Route path="/confirm-account" element={isAuthenticated ? <Navigate to="/" /> : <ConfirmAccount />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute roles={['Clients']}>
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
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default App;