import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmpContext = createContext();

export const useEmpContext = () => {
  return useContext(EmpContext);
};

export const EmpProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'http://localhost:5000/api/emp/';

  // On initial render, check for token and set user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      if (!user) {
        getUserDetails(token);
      }
    }
  }, [user]);

  // Fetch user details
  const getUserDetails = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setRole(response.data.role);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  // Handle login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}login`, { email, password });
      const { token, user } = response.data;
      if (!user || !user.role) {
        throw new Error('Invalid user data: Missing user or role');
      }
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(user);
      setRole(user.role);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle signup
  const signup = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}signup`, data);
      const { token, user } = response.data;
      if (!user || !user.role) {
        throw new Error('Invalid user data: Missing user or role');
      }
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(user);
      setRole(user.role);
    } catch (error) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setRole('');
  };

  // Fetch employees
  const getEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
    } catch (error) {
      setError('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee details
  const getEmployeeDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployeeDetails(response.data);
    } catch (error) {
      setError('Failed to fetch employee details.');
    } finally {
      setLoading(false);
    }
  };

  // Create employee
  const createEmployee = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}employees`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      getEmployees(); // Refresh employees list after creation
    } catch (error) {
      setError('Failed to create employee.');
    } finally {
      setLoading(false);
    }
  };

  // Update employee
  const updateEmployee = async (id, data) => {
    setLoading(true);
    try {
      await axios.put(`${apiUrl}employees/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      getEmployees(); // Refresh employees list after update
    } catch (error) {
      setError('Failed to update employee.');
    } finally {
      setLoading(false);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      getEmployees(); // Refresh employees list after deletion
    } catch (error) {
      setError('Failed to delete employee.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmpContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        employees,
        employeeDetails,
        loading,
        error,
        login,
        signup,
        logout,
        getEmployees,
        getEmployeeDetails,
        createEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmpContext.Provider>
  );
};
