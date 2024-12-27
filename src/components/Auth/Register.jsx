// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';


const Register = () => {
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  

  const validationSchema = Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
    username: Yup.string()
    .required('Username is required'),
    
    first_name: Yup.string()
    .required('First name is required'),
    
    last_name: Yup.string()
    .required('Last name is required'),
    
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
    
    confirm_password: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    
    user_type: Yup.string()
    .required('User type is required'),



  })





  
  const handleSubmit = async (values) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/register/`, values);
      localStorage.setItem('email', values.email); // Save email in localStorage
      navigate('/verify-otp');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ api: 'Registration failed. Please try again.' });
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

          <Formik
            initialValues={{ email: '',username: '', first_name: '', last_name: '', password: '', confirm_password: '', user_type: 'jobseeker',}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >

          <Form >
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email"
                
                
                
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
</div>
            
            <div className="mb-4">
              <Field
                type="text"
                name="username"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Username"
                
                
                
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />

            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="first_name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="First Name"
                
                
              />
              <ErrorMessage name="first_name" component="p" className="text-red-500 text-sm mt-1" />

            
            
            <div className="mb-4">
            </div>
              <Field
                type="text"
                name="last_name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Last Name"
                
                
                
              />
              <ErrorMessage name="last_name" component="p" className="text-red-500 text-sm mt-1" />
            <div className="mb-4">
              </div>
              <Field
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                
                
                
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="confirm_password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm Password"
                
                
                
              />
              <ErrorMessage name="confirm_password" component="p" className="text-red-500 text-sm mt-1" />
</div>
            
            

            <div className="mb-4">
              <Field
              as="select"
                name="user_type"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                
                
                
              >
                <option value="jobseeker">Jobseeker</option>
                <option value="employee">Employee</option>
              </Field>
              <ErrorMessage name="user_type" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300">
              Register
            </button>
          </Form>
          </Formik>

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
