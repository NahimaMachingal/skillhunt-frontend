// src/components/Auth/Login.jsx

import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../features/auth/authApi'; 
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('jobseeker'); // Added userType state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Access token and user info from the Redux store
  const { token, userType: storeUserType } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({

    email: Yup.string()
     .email('Invalid email address')
     .required('Email is required'),
    password: Yup.string()
     .min(6, 'Password must be at least 6 characters')
     .required('Password is required'),
  })

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    setLoading(true);
    try {
      const resultAction = await dispatch(googleLogin({ token, user_type: userType }));
      if (resultAction.error) {
        // Log the specific error details
      console.error('Detailed Error:', resultAction.error);

      
        // More specific error handling
        if (resultAction.error.status === 403) {
          setError('You need to register first to login');
        } else {
          setError('Google login failed. Please try again.');
        }
      } else {
        // Existing login success logic remains the same
        if (resultAction.user_type) {
          if (resultAction.user_type === 'jobseeker') {
            navigate('/mainhome');
          } else if (resultAction.user_type === 'employee') {
            navigate('/ehome');
          }
        }}
    } catch (error) {
      console.error('Error during  login:', error);
      setError('You need to register first to login.');
    } finally {
      setLoading(false); // Stop loader after login attempt
    }
  };
  
  
  

  
  const handleLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const resultAction = await dispatch(loginUser({ email, password,  user_type: userType})); // Include user_type in the login request
  
      // Check if login was successful
      if (resultAction.user_type) { // Check for the presence of user_type
        const userType = resultAction.user_type; // Get the user type
  
        // Redirect based on user type
        if (userType === 'admin') {
          navigate('/admin/home'); // Redirect to Admin Home
        } else if (userType === 'jobseeker') {
          navigate('/mainhome'); // Redirect to User Home
        } else if (userType === 'employee') {
          navigate('/ehome'); // Redirect to Employee Home
        }
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('User is not verified');
    } finally {
      setLoading(false); // Stop loader after login attempt
    }
  };

  React.useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(document.getElementById('google-button'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

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
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
          <Form>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Email Address"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <input type="checkbox" id="rememberMe" className="mr-2"/>
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/forgotpassword" className="text-purple-500 hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300 flex items-center justify-center"
            disabled={loading}
            
            >
              {loading ? (
                  <span className="loader animate-spin w-4 h-4 border-2 border-white rounded-full"></span>
                ) : (
                  'Login'
                )}
            </button>
          </Form>
          </Formik>
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
          <div id="google-button"></div>
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
