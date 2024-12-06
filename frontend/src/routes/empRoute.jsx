import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import EmployeeForm from '../components/employee/EmployeeForm';
import EmployeeDetails from '../components/employee/EmployeeDetails';
import ProtectedRoute from './ProtectedRoute';
import { useEmpContext } from '../context/EmpContext';

const EmpRoutes = () => {
  const { isAuthenticated, role } = useEmpContext();

  return (
    <Router>
      <Routes>
        {/* Root route with conditional redirects */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" /> // Redirect to dashboard if authenticated
            ) : (
              <div>
                <h1>Welcome to the App</h1>
                <button onClick={() => window.location.href = '/login'}>Login</button>
                <button onClick={() => window.location.href = '/signup'}>Signup</button>
              </div>
            )
          }
        />

        {/* Login and Signup Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute roles={['admin', 'hr', 'manager']} component={Dashboard} />}
        />
        <Route
          path="/employee/form"
          element={<ProtectedRoute roles={['admin', 'hr']} component={EmployeeForm} />}
        />
        <Route
          path="/employee/:empId"
          element={<ProtectedRoute roles={['admin', 'manager', 'hr', 'employee']} component={EmployeeDetails} />}
        />
        <Route
          path="/employee/edit/:empId"
          element={<ProtectedRoute roles={['admin', 'hr']} component={EmployeeForm} />}
        />
      </Routes>
    </Router>
  );
};

export default EmpRoutes;
