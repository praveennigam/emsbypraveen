import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate for navigation in React Router v6
import { EmpContext } from './EmpContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    gender: 'male',
    contactNumber: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: { name: '', relationship: '', phone: '' },
    education: '',
    workExperience: '',
    skills: '',
    certifications: '',
    isMarried: false,
    salary: '',
    department: '',
    employmentType: 'full-time',
  });

  const { signup, error } = useContext(EmpContext);
  const navigate = useNavigate();  // Initialize useNavigate instead of useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills' || name === 'certifications') {
      setFormData({
        ...formData,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else if (name.startsWith('emergencyContact')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        emergencyContact: { ...formData.emergencyContact, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(formData);
    if (data) {
      navigate('/login');  // Use navigate to redirect after signup
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
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
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emergencyContact.name"
          value={formData.emergencyContact.name}
          onChange={handleChange}
          placeholder="Emergency Contact Name"
        />
        <input
          type="text"
          name="emergencyContact.relationship"
          value={formData.emergencyContact.relationship}
          onChange={handleChange}
          placeholder="Emergency Contact Relationship"
        />
        <input
          type="text"
          name="emergencyContact.phone"
          value={formData.emergencyContact.phone}
          onChange={handleChange}
          placeholder="Emergency Contact Phone"
        />
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Education"
        />
        <textarea
          name="workExperience"
          value={formData.workExperience}
          onChange={handleChange}
          placeholder="Work Experience"
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
        />
        <input
          type="text"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          placeholder="Certifications (comma separated)"
        />
        <label>
          Is Married:
          <input
            type="checkbox"
            name="isMarried"
            checked={formData.isMarried}
            onChange={(e) => setFormData({ ...formData, isMarried: e.target.checked })}
          />
        </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="intern">Intern</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Signup;
