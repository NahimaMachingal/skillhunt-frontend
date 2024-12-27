// src/components/Auth/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ResetPassword = () => {
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Access the token from the Redux store
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResetPassword = async () => {
    try {
      setError('');
      setSuccess('');
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/reset-password/`, { email, otp, new_password: newPassword }
        
      );
      setSuccess(response.data.message);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to reset password. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    try {
      setError('');
      setSuccess('');
      setResendCooldown(30);
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/send-otp/`, { email }
       
      );
      setSuccess('OTP sent successfully!!');
      // Clear the success message after a few seconds
      setTimeout(() => setSuccess(''), 5000); // Clear after 5 seconds
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to resend OTP. Please try again.');
      setResendCooldown(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
        
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={otp} 
          onChange={(e) => setOTP(e.target.value)} 
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="password" 
          placeholder="Enter new password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          onClick={handleResetPassword} 
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Reset Password
        </button>

        <button 
          onClick={handleResendOTP} 
          disabled={resendCooldown > 0}
          className={`w-full px-4 py-2 font-semibold text-white rounded-md mt-4 ${
            resendCooldown > 0 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
        >
          {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP'}
        </button>
        
        {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-center text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
