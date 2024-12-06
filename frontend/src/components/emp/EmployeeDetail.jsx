import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { EmpContext } from './EmpContext';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { deleteEmployee } = useContext(EmpContext);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    await deleteEmployee(id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Email: {employee.email}</p>
      <p>Role: {employee.role}</p>
      <p>Department: {employee.department}</p>
      <p>Contact Number: {employee.contactNumber}</p>
      <p>Address: {employee.address}</p>
      {/* Add more fields as required by your schema */}
      <Link to={`/update-employee/${employee._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmployeeDetail;