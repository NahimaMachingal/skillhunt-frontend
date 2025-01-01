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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    
    dispatch(logoutUser());
    navigate('/login');
  };
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="bg-gray-400 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white text-xl font-bold">
          
        </div>
        <button
          className="text-white md:hidden block"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex md:space-x-4 w-full md:w-auto ${
            menuOpen ? 'flex' : 'hidden'
          } md:items-center`}
        >
          <Link to="/ehome" className="text-white hover:text-gray-200 block px-4 py-2 md:py-0">
            Employer Home
          </Link>
           {/* Settings Button */}
           <div className="relative">
          <button
            onClick={toggleSettings}
            className="text-white hover:text-gray-200 block px-4 py-2 md:py-0"
          >
            Settings
          </button>
          {/* Dropdown Menu for Settings */}
          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/employer/employerprofile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setSettingsOpen(false)} // Close the dropdown
              >
                Profile
              </Link>
              
            </div>
          )}
          </div>
          
           <Link to="/employerchat" className="text-white hover:text-gray-200 block px-4 py-2 md:py-0">Chat</Link>
           <NotificationList />

           <Link to="/employer/chatbot" className="text-white hover:text-gray-200 block px-4 py-2 md:py-0">
            FAQ
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 block px-4 py-2 md:py-0"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
