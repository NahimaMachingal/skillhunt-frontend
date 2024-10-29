// src/components/Admin/AdminNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authApi';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
    // Redirect to the login page
    navigate('/login');
  };
  return (
    <nav className="bg-blue-600 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white text-xl font-bold">
          
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/admin/home" className="text-white hover:text-gray-200">
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
