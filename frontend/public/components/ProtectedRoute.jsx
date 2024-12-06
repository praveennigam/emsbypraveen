import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useGlobalState();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
