// src/components/Auth/EHome.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';

const EHome = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 relative">
            {/* Post Job and Posted Jobs buttons on the left side */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <Link to="/postjob">
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                    >
                        Post Job
                    </button>
                </Link>
                <Link to="/jobs">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Posted Jobs
                    </button>
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to the Home Page</h1>
                {user ? (
                    <div>
                        {/* Additional content for logged-in users can be added here */}
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Please log in
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EHome;

