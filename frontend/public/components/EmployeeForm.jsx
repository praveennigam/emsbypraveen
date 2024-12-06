import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import axios from 'axios';

const EmployeeForm = () => {
  const { userRole, fetchEmployees, employees } = useGlobalState();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    contactNumber: '',
    address: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Fetch employee data for editing
  useEffect(() => {
    if (id) {
      const employee = employees.find((emp) => emp._id === id);
      if (employee) {
        setFormData({
          name: employee.name,
          email: employee.email,
          role: employee.role,
          contactNumber: employee.contactNumber,
          address: employee.address,
          image: null, // Will not pre-set image because it will be fetched separately.
        });
        setImagePreview(`http://localhost:5000/${employee.image}`);
      }
    }
  }, [id, employees]);

  // Handle form submission for Create and Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      if (id) {
        // Edit existing employee
        await axios.put(`http://localhost:5000/api/employees/${id}`, formDataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new employee
        await axios.post('http://localhost:5000/api/employees', formDataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      fetchEmployees(); // Refresh the employee list after creating or editing
      navigate('/employees'); // Redirect to employee list
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input type="file" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Image Preview" width={100} />}
        <button type="submit">{id ? 'Update' : 'Create'} Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
