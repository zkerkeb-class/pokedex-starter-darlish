import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Pas connecté => rediriger vers login
    return <Navigate to="/login" />;
  }

  // Connecté => accéder à la page protégée
  return children;
};

export default PrivateRoute;
