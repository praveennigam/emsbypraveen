import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmpContext } from '../context/EmpContext';

const Dashboard = () => {
  const { role, isAuthenticated, employees, getEmployees, user } = useEmpContext();
  const navigate = useNavigate();

  // Fetch employees on initial load
  useEffect(() => {
    if (isAuthenticated) {
      getEmployees();
    }
  }, [isAuthenticated, getEmployees]);

  // Handle employee form navigation
  const handleEmployeeForm = () => {
    navigate('/employee/form');
  };

  // Handle employee edit navigation
  const handleEmployeeEdit = (empId) => {
    navigate(`/employee/edit/${empId}`);
  };

  // Handle viewing employee details
  const handleEmployeeDetails = (empId) => {
    navigate(`/employee/${empId}`);
  };

  return (
    <div>
      <h2>Welcome {role === 'admin' ? 'Admin' : role === 'hr' ? 'HR' : 'Manager'} Dashboard</h2>

      {/* Button to Add Employee - Only for Admin and HR */}
      {(role === 'admin' || role === 'hr') && (
        <button onClick={handleEmployeeForm}>Add New Employee</button>
      )}

      <h3>Employee List</h3>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <div>
              <strong>{emp.name}</strong> - {emp.position} - {emp.department}
            </div>

            {/* Button to Edit Employee - Only for Admin, HR */}
            {(role === 'admin' || role === 'hr') && (
              <button onClick={() => handleEmployeeEdit(emp.id)}>Edit</button>
            )}

            {/* Button to View Employee Details - Available for All Roles */}
            <button onClick={() => handleEmployeeDetails(emp.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
