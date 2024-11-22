// src/components/Admin/AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-500 p-6 shadow-lg h-screen">
      <div className="text-white text-3xl font-bold mb-8 text-center">
        SKILLHUNT ADMIN
      </div>
      <ul className="space-y-5">
        <li>
          <Link
            to="/admin/employees"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Employees
          </Link>
        </li>
        <li>
          <Link
            to="/admin/home"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Jobseekers
          </Link>
        </li>

        <li>
          <Link
            to="/userverification"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Non Verified Users
          </Link>
        </li>


        <li>
          <Link
            to="/admin/joblist"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Jobs
          </Link>
        </li>
        

        <li>
          <Link
            to="/adminappliedjobs"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Applied Jobs
          </Link>
        </li>


        <li>
          <Link
            to="/pendingjobs"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Pending Jobs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
