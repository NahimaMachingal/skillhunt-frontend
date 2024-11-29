// src/components/Admin/AdminNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../../features/auth/authApi';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false); // State to toggle dropdown

  const handleLogout = () => {
    
    dispatch(logoutUser());
    navigate('/login');
  };
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white text-xl font-bold">
          
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/ehome" className="text-white hover:text-gray-200">
            Employer Home
          </Link>
          
          <button
            onClick={toggleSettings}
            className="text-white hover:text-gray-200"
          >
            Settings
          </button>
          {/* Dropdown Menu for Settings */}
          {settingsOpen && (
            <div className="absolute right-0 mt-11 w-40 bg-white rounded-md shadow-lg">
              <Link
                to="/employer/employerprofile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setSettingsOpen(false)} // Close the dropdown
              >
                Profile
              </Link>
              <Link
                to="/subscribe"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setSettingsOpen(false)} // Close the dropdown
              >
                Subscribe
              </Link>
            </div>
          )}
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

export default Navbar;
