import React, { useContext, useEffect, useState } from 'react';
import { EmpContext } from './EmpContext';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user, updateEmployee } = useContext(EmpContext);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(user._id, formData);
    navigate('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="department" value={formData.department} onChange={handleChange} />
      <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      <input type="text" name="address" value={formData.address} onChange={handleChange} />
      {/* Add any other fields as required by your schema */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default MyProfile;