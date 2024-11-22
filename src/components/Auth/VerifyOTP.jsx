// src/components/Auth/VerifyOTP.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [resendCooldown, setResendCooldown] = useState(0);


  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email'); // Retrieve email from local storage

    if (!email) {
      setError('Email not found. Please register again.');
      return;
    }
    try {
      setError('');
      setMessage('');
      const response = await axios.post('http://localhost:8000/api/verify-otp/', { email, otp });
      setMessage(response.data.message);
      // Clear email from local storage after successful verification
      localStorage.removeItem('email');
      navigate('/login'); // Redirect to login after successful verification
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    }
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
        setError('Email not found. Please register again.');
        return;
    }
    try {
        setError('');
        setMessage('');
        setResendCooldown(30);
        await axios.post('http://localhost:8000/api/resend-otp/', { email });
        setMessage('OTP sent successfully!');
        setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
        setError(error.response?.data?.error || 'Failed to resend OTP. Please try again.');
        setResendCooldown(0);
    }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Verify
          </button>
          
        </form>
        <button 
          onClick={handleResendOTP} 
          disabled={resendCooldown > 0}
          className={`w-full px-4 py-2 font-semibold text-white rounded-md mt-4 ${
            resendCooldown > 0 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
        >
          {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP'}
        </button>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;