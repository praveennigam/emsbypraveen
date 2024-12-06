import React, { useEffect, useState } from 'react';
import { useEmpContext } from './EmpContext';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const { fetchEmployees, employees, deleteEmployee } = useEmpContext();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEmployeeClick = (emp) => {
    setSelectedEmployee(emp);
    document.querySelector('.popup-overlay').style.display = 'block';
    document.querySelector('.employee-popup').style.display = 'block';
  };

  const closePopup = () => {
    document.querySelector('.popup-overlay').style.display = 'none';
    document.querySelector('.employee-popup').style.display = 'none';
  };

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>
      <div>
        <Link to="/create-employee" className="btn btn-primary">Create Employee</Link>
      </div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>EmpId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <button onClick={() => handleEmployeeClick(emp)} className="btn btn-info">View</button>
                <button onClick={() => deleteEmployee(emp._id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Overlay */}
      <div className="popup-overlay" onClick={closePopup}></div>

      {/* Employee Popup Card */}
      {selectedEmployee && (
        <div className="employee-popup">
          <div className="popup-header">{selectedEmployee.name}</div>
          <div className="popup-content">
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Role:</strong> {selectedEmployee.role}</p>
            {/* Add other employee details if needed */}
          </div>
          <div className="popup-footer">
            <button className="btn-close" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
