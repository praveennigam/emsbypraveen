import React, { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  const { fetchEmployees, employees } = useGlobalState();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Handle employee deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchEmployees(); // Refresh employee list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employees</h2>
      <Link to="/employees/create">Add New Employee</Link>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <span>{employee.name}</span>
            <Link to={`/employees/edit/${employee._id}`}>Edit</Link>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
