// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    user_type: 'jobseeker', // Default user type
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/register/', formData);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
        {/* Left Section - Registration Form */}
        <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl text-center text-cyan-800 font-bold mb-6 
   bg-gradient-to-r from-gray-800 to-emerald-600 
   bg-clip-text text-transparent shadow-lg">
   Register For SkillHunt
</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="first_name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="last_name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirm_password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
            

            <div className="mb-4">
              <select
                name="user_type"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.user_type}
                onChange={handleChange}
                required
              >
                <option value="jobseeker">Jobseeker</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <button type="submit" className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300">
              Register
            </button>
          </form>

          {/* Already have an account? Link */}
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <span
                onClick={handleLoginRedirect}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
        {/* Right Section - Illustration */}
        <div className="hidden md:block md:w-1/2 bg-purple-100 p-8">
          <img
            src="/nhn.jpg" // Reference the image from the public folder
            alt="Illustration"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
