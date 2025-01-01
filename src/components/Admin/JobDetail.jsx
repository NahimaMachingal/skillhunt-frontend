//src/components/Admin/JonDetails.jsx

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { approveJob } from '../../features/job/jobSlice'; // Make sure to import your thunk
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../features/job/jobSlice';
import { useNavigate } from 'react-router-dom';

const JobDetail = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { job, status, error } = useSelector((state) => state.job);

    useEffect(() => {
        dispatch(fetchJobById(jobId));
    }, [dispatch, jobId]);

    
    if (status === 'failed') {
        return <p className="text-lg text-red-500">Error: {error}</p>;
    }

    if (!job) {
        return <p className="text-lg text-gray-500">Job not found.</p>;
    }

    const handleApprove = () => {
        dispatch(approveJob(jobId)); // Dispatch the approveJob action
        navigate('/admin/home'); // Navigate to the admin home page
    };

    return (
        <div className="container mx-auto p-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Job Details */}
                <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 text-blue-600">{job.title}</h2>
                        <p className="text-gray-500 text-md mb-4">Posted by {job.employer_company_name}</p>
                        <p className="text-sm text-gray-400 mb-4">{new Date(job.posted_at).toLocaleDateString()}</p>
                    </div>
                    
                    {/* Download and Contact Buttons */}
                    <div className="flex justify-center space-x-4 mb-6">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 ease-in-out">
                            Download Job Details
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-200 ease-in-out">
                            Contact Employer
                        </button>
                    </div>
                    
                    {/* Key Job Information */}
                    <div className="border-t pt-4 text-left">
                        <p className="text-lg font-semibold text-gray-700">Location:</p>
                        <p className="text-gray-600">{job.location}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Employment Type:</p>
                        <p className="text-gray-600">{job.employment_type}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Experience Level:</p>
                        <p className="text-gray-600">{job.experience_level}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Salary Range:</p>
                        <p className="text-gray-600">{job.currency} {job.salary_min} - {job.salary_max}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Is Remote:</p>
                        <p className="text-gray-600">{job.is_remote ? 'Yes' : 'No'}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Application Deadline:</p>
                        <p className="text-gray-600">{job.application_deadline}</p>
                    </div>
                </div>

                {/* Right Column: Job Responsibilities and Qualifications */}

                
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    {/* Approve Button */}
            <div className="flex justify-end mt-8">
                <button onClick={handleApprove} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-600 transition duration-200 ease-in-out">
                    Approve
                </button>
            </div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Job Responsibilities</h3>
                    <p className="text-gray-700 mb-6">{job.responsibilities}</p>

                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Qualifications</h3>
                    <p className="text-gray-700 mb-6">{job.qualifications}</p>

                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Nice to Have</h3>
                    <p className="text-gray-700">{job.nice_to_have}</p>
                </div>
            </div>

            
        </div>
    );
};

export default JobDetail;
