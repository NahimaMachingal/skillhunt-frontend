import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/nnn.jpg')` }}>
      {/* Overlay for darken effect */}
      

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-5 flex justify-between items-center z-20">
        <div className="text-2xl font-bold">
          <span className="flex items-center">
            <img src="/logo.png" alt="SkillHunt Logo" className="h-8 mr-2" /> SkillHunt
          </span>
        </div>
        <div className="flex space-x-4">

       
  
  <Link to='/login'>
    <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
     Login
    </button>
  </Link>
  <Link to='/register'>
    <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
     Register
    </button>
  </Link>
</div>

      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center ">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 ">Find Your Dream Job Today!</h1>
        <p className="mb-8 text-lg md:text-xl">Connecting Talent with Opportunity: Your Gateway to Career Success</p>

        {/* Job Search Form */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Job Title or Company"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none">
            <option>Select Location</option>
            {/* Add locations */}
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none">
            <option>Select Category</option>
            {/* Add categories */}
          </select>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">Search Job</button>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-white">25,850</div>
            <div className="text-gray-400">Jobs</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-white">10,250</div>
            <div className="text-gray-400">Candidates</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-white">18,400</div>
            <div className="text-gray-400">Companies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

