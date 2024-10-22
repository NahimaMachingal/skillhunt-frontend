// src/components/Auth/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { fetchApprovedJobs } from '../../features/job/jobSlice';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const approvedJobs = useSelector((state) => state.job.approvedJobs);

    useEffect(() => {
        dispatch(fetchApprovedJobs());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-blue-700">Recommended Jobs</h1>
                <span className="text-lg font-medium text-gray-700">({approvedJobs.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {approvedJobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                    >
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                            <p className="text-gray-500">Company: {job.employer_company_name}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                                {job.employment_type}
                            </span>
                            <span className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                                {job.location}
                            </span>
                        </div>
                        <div className="mb-4 text-gray-600">
                            <p>
                                <span className="font-medium">Posted at:</span> {new Date(job.posted_at).toLocaleDateString()}
                            </p>
                            <p>
                                <span className="font-medium">Salary:</span> {job.salary_max ? `$${job.salary_min}/hr` : 'Not specified'}
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
