import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeePage = () => {
  const { id } = useParams();
  const { employees, createEmployee, updateEmployee, fetchEmployees } = useGlobalState();
  const [employeeData, setEmployeeData] = useState({ name: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const employee = employees.find((e) => e._id === id);
      if (employee) setEmployeeData({ name: employee.name, role: employee.role });
    }
  }, [id, employees]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateEmployee(id, employeeData).then(() => navigate('/employees'));
    } else {
      createEmployee(employeeData).then(() => navigate('/employees'));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={employeeData.name}
          onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={employeeData.role}
          onChange={(e) => setEmployeeData({ ...employeeData, role: e.target.value })}
        />
        <button type="submit">{id ? 'Update' : 'Create'} Employee</button>
      </form>
    </div>
  );
};

export default EmployeePage;
