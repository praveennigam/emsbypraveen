import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const Navbar = () => {
  const { user, logout } = useGlobalState();

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/helpdesk">Help Desk</Link>
      <Link to="/holidays">Holidays</Link>
      <Link to="/salary">Salaries</Link>
      <Link to="/timeentry">Time Entries</Link>
      <Link to="/leave">Leaves</Link>
      {user ? (
        <>
          <span>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
