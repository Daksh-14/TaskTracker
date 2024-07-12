import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn,authCheck } = useAuth();

  if(authCheck)return <h1>Loading...</h1>

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
