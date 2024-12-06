import React, { useContext, useState, useEffect } from 'react';
import { EmpContext } from './EmpContext';
import { useNavigate } from 'react-router-dom';
import './CreateEmployee.css'; // Import the CSS file

const CreateEmployee = () => {
  const { createEmployee } = useContext(EmpContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    department: '',
    contactNumber: '',
    address: '',
    dateOfBirth: '',
    gender: 'male',
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee(formData);
    navigate('/');
  };

  // Set form visibility to true once component has mounted
  useEffect(() => {
    setFormVisible(true);
  }, []);

  return (
    <div>
      <h2>Create Employee</h2>
      <form
        className={`create-employee-form ${isFormVisible ? 'visible' : ''}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="role"
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          type="text"
          name="department"
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          type="text"
          name="contactNumber"
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <textarea
          name="address"
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
        />
        <select name="gender" onChange={handleChange} value={formData.gender}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
