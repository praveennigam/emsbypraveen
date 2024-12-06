import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const PrivateRoute = ({ allowedRoles, Component }) => {
  const { auth, userRole } = useGlobalState();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PrivateRoute;
