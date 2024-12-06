import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { userRole } = useGlobalState();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleProtectedRoute;
