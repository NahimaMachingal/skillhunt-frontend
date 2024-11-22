// src/components/Employee/EmployeeSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-500 p-6 shadow-lg min-h-screen">
      <div className="text-white text-3xl font-bold mb-8 text-center">
        SKILLHUNT EMPLOYEE
      </div>
      <ul className="space-y-5">
        <li>
          <Link
            to="/postjob"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Post Job
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Posted Jobs
          </Link>
        </li>
        <li>
          <Link
            to="/appliedcandidates"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Applied Candidates
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
