import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { EmpProvider } from './EmpContext'; // EmpProvider ensures all components have access to EmpContext
import MyProfile from './MyProfile';
import Login from './Login';
import Signup from './Signup';
import CreateEmployee from './CreateEmployee';
import EmployeeDetail from './EmployeeDetail';
import UpdateEmployee from './UpdateEmployee';
import Dashboard from './Dashboard';  // Import the Dashboard component

const EmpRoute = () => {
  return (
    <EmpProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard Route */}
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        </Routes>
      </Router>
    </EmpProvider>
  );
};

export default EmpRoute;
