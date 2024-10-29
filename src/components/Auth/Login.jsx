// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
  
      // Check if login was successful
      if (resultAction.user_type) { // Check for the presence of user_type
        const userType = resultAction.user_type; // Get the user type
  
        // Redirect based on user type
        if (userType === 'admin') {
          navigate('/admin/home'); // Redirect to Admin Home
        } else if (userType === 'jobseeker') {
          navigate('/home'); // Redirect to User Home
        } else if (userType === 'employee') {
          navigate('/ehome'); // Redirect to Employee Home

        }
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Incorrect username or password');
  
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl text-center text-cyan-800 font-bold mb-6 
   bg-gradient-to-r from-gray-800 to-emerald-600 
   bg-clip-text text-transparent shadow-lg">
   Login For SkillHunt
</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <div>
                <input type="checkbox" id="rememberMe" className="mr-2"/>
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="text-purple-500 hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{' '}
              <span
                onClick={handleRegisterRedirect}
                className="text-purple-500 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center mt-6">
            <hr className="border-gray-300 w-1/3"/>
            <span className="text-gray-500 mx-2">or login with</span>
            <hr className="border-gray-300 w-1/3"/>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">Google</button>
            <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Facebook</button>
          </div>
        </div>
        {/* Right Section - Illustration */}
        <div className="hidden md:block md:w-1/2 bg-purple-100 p-8">
          <img
            src="/nhn.jpg"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
