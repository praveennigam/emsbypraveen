import React, { useEffect, useState, useContext } from 'react';
import { EmpContext } from './EmpContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const { id } = useParams();
  const { updateEmployee } = useContext(EmpContext);
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployee(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(id, formData);
    navigate(`/employee/${id}`);
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" onChange={handleChange} placeholder="Leave blank to keep current password" />
      <input type="text" name="role" value={formData.role} onChange={handleChange} />
      <input type="text" name="department" value={formData.department} onChange={handleChange} />
      <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      <input type="text" name="address" value={formData.address} onChange={handleChange} />
      {/* Add any other fields as required by your schema */}
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default UpdateEmployee;