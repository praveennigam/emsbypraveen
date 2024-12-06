import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useEmpContext } from './EmpContext';

const Navbar = () => {
  const { isAuthenticated, user } = useEmpContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-brand">
        <i className="fas fa-building"></i> Employee Management
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="fas fa-tachometer-alt icon"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-user icon"></i> {user?.name}
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                >
                  <i className="fas fa-sign-out-alt icon"></i> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="fas fa-sign-in-alt icon"></i> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  <i className="fas fa-user-plus icon"></i> Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
