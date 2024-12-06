import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const EmpContext = createContext();  // Named export for EmpContext

export const useEmpContext = () => useContext(EmpContext);

export const EmpProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'http://localhost:5000/api/emp';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user details');
      setLoading(false);
    }
  };

  const signup = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, data);
      return response.data;
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, data);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      fetchUserDetails();
      return response.data;
    } catch (err) {
      setError('Failed to login');
    }
  };

  const createEmployee = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/employees`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      setError('Failed to create employee');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  const fetchEmployeeDetails = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployee(response.data);
    } catch (err) {
      setError('Failed to fetch employee details');
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      const response = await axios.put(`${apiUrl}/employees/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${apiUrl}/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  const assignManager = async (empId, managerId) => {
    try {
      await axios.put(`${apiUrl}/employees/${empId}/assign-manager`, { managerId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (err) {
      setError('Failed to assign manager');
    }
  };

  return (
    <EmpContext.Provider
      value={{
        employees,
        employee,
        isAuthenticated,
        user,
        loading,
        error,
        signup,
        login,
        createEmployee,
        fetchEmployees,
        fetchEmployeeDetails,
        updateEmployee,
        deleteEmployee,
        assignManager,
      }}
    >
      {children}
    </EmpContext.Provider>
  );
};
