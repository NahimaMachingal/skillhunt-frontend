import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../features/auth/authApi";
import NotificationList from "../NotificationList";
import { fetchProfile } from "../../features/jobseekerprofile/jobseekerProfileSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.profile);
  console.log("useee:", data)
  const [settingsOpen, setSettingsOpen] = useState(false); // State to toggle dropdown
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [isSubscribed, setIsSubscribed] = useState(false);



  
  useEffect(() => {
      dispatch(fetchProfile());
    }, [dispatch]);


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };



  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-slate-300 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="flex items-center text-2xl font-semibold text-gray-800">
          <img
            src="/kk.png"
            alt="SkillHunt Logo"
            className="h-19 w-14  rounded-full mr-3 hidden lg:block"
          />
          <Link
            to="/home"
            className="hover:text-indigo-800 font-bold text-3xl tracking-wide transition-colors "
          >
            Skill<span className="text-gray-400">Hunt</span>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`} />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white shadow-md md:relative md:top-auto md:left-auto md:w-auto md:flex md:items-center md:space-x-8 transition-all ease-in-out duration-300`}
        >
          <Link
            to="/home"
            className="block md:inline-block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/dashboard"
            className="block md:inline-block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to={data?.user?.is_subscribed ? "/resumelanding" : "/jobseekersubscribe"}
            className="block md:inline-block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </Link>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={toggleSettings}
              className="md:inline-block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300 flex items-center"
              aria-haspopup="true"
              aria-expanded={settingsOpen ? "true" : "false"}
            >
              <span>Settings</span>
              <i className="ml-1 fas fa-caret-down" />
            </button>
            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden transition-all ease-in-out duration-200 z-50">
                <Link
                  to="/jobseeker/jobseekerprofile"
                  className="block px-4 py-2 hover:bg-gray-100 transition text-sm md:text-base"
                  onClick={() => {
                    setSettingsOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/jobseekersubscribe"
                  className="block px-4 py-2 hover:bg-gray-100 transition text-sm md:text-base"
                  onClick={() => {
                    setSettingsOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Subscribe
                </Link>
                <Link
                  to="/jobseeker/chatbot"
                  className="block px-4 py-2 hover:bg-gray-100 transition text-sm md:text-base"
                  onClick={() => {
                    setSettingsOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>

          <NotificationList />

          <Link
            to="/chat"
            className="block md:inline-block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Chat
          </Link>
          <button
            onClick={handleLogout}
            className="block md:inline-block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;