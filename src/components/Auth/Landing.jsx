import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  // Simulated authentication state
  const isAuthenticated = false; // Replace with actual authentication check

  const handleJobSearch = () => {
    if (!isAuthenticated) {
      // Redirect to login page
      navigate('/login');
    } else {
      // Redirect to home or search results page
      navigate('/home');
    }
  };
  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/nnn.jpg')` }}
    >
      {/* Overlay for darken effect */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-5 flex justify-between items-center z-20">
        <div className="text-2xl font-bold text-white">
          <span className="flex items-center">
            <img
              src="/kk.png"
              alt="SkillHunt Logo"
              className="h-14 w-14 rounded-full mr-2"
            />
            Skill Hunt
          </span>
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Dream Job Today!
        </h1>
        <p className="mb-8 text-lg md:text-xl">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        {/* Job Search Form */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Job Title or Company"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black"
          />
          <button
          onClick={handleJobSearch}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors">
            Search Job
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mt-12">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">25,850</div>
            <div className="text-gray-300">Jobs</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">10,250</div>
            <div className="text-gray-300">Candidates</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">18,400</div>
            <div className="text-gray-300">Companies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
