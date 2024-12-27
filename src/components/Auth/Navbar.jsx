// src/components/Admin/AdminNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../../features/auth/authApi';
import NotificationList from '../NotificationList';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false); // State to toggle dropdown


  
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
    // Redirect to the login page
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
          <h3>SKILLHUNT</h3>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-white hover:text-gray-200">
            Jobseeker Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/resumelanding" className="text-white hover:text-gray-200">
            Resume
          </Link>          
          <button
            onClick={toggleSettings}
            className="text-white hover:text-gray-200 relative"
          >
            Settings
          </button>
          {/* Dropdown Menu for Settings */}
          {settingsOpen && (
            <div className="absolute right-10 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <Link
                to="/jobseeker/jobseekerprofile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setSettingsOpen(false)} // Close the dropdown
              >
                Profile
              </Link>
              <Link
                to="/jobseekersubscribe"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setSettingsOpen(false)} // Close the dropdown
              >
                Subscribe
              </Link>
            </div>
          )}
          <NotificationList />
          <Link to="/chat" className="text-white hover:text-gray-200">Chat</Link>
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
