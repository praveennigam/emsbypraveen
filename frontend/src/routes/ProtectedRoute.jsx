import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEmpContext } from '../context/EmpContext';

const ProtectedRoute = ({ roles, component: Component }) => {
  const { isAuthenticated, role } = useEmpContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default ProtectedRoute;
