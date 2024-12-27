// src/components/Auth/ForgotPassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();


  // Get the token from the Redux store
  const token = useSelector((state) => state.auth.accessToken);

  
  const handleSendOTP = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/send-otp/`, { email });
      setSuccess(response.data.message);
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          onClick={handleSendOTP} 
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Send OTP
        </button>

        {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-center text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
