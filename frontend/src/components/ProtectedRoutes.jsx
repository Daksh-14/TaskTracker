import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import Loader from './Loader';

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn,authCheck } = useAuth();

  if(authCheck)return <Loader/>

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
