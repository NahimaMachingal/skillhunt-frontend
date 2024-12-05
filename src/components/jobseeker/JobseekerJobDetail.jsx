// src/components/JobSeekerJobDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobSeekerJobById } from '../../features/job/jobSlice';
import { useNavigate, useParams } from 'react-router-dom';



const JobSeekerJobDetail = () => {
    const { id } = useParams(); // Get the job ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { job, status, error } = useSelector((state) => state.job);
    const { conversations, error: chatError } = useSelector((state) => state.chat);


    useEffect(() => {
        dispatch(fetchJobSeekerJobById(id)); // Fetch the job details
    }, [dispatch, id]);

    useEffect(() => {
        console.log('Job data:', job);  // Log the fetched job data
    }, [job]);

    if (status === 'loading') {
        return <p className="text-lg text-gray-500">Loading...</p>;
    }

    if (status === 'failed') {
        return <p className="text-lg text-red-500">Error: {error}</p>;
    }

    if (!job) {
        return <p className="text-lg text-gray-500">Job not found.</p>;
    }

    const handleApplyClick = () => {
        navigate(`/jobs/${id}/apply`);
    };

    

    return (
        <div className="container mx-auto p-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Job Details */}
                <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 text-blue-600">{job.title}</h2>
                        <p className="text-gray-500 text-md mb-4">Company: {job.employer_company_name}</p>
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
                        <p className="text-gray-600">{job.salary_min} - {job.salary_max}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Is Remote:</p>
                        <p className="text-gray-600">{job.is_remote ? 'Yes' : 'No'}</p>

                        <p className="text-lg font-semibold text-gray-700 mt-4">Application Deadline:</p>
                        <p className="text-gray-600">{job.application_deadline}</p>
                    </div>
                </div>

                {/* Right Column: Job Responsibilities and Qualifications */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">

                    {/* Approve Button */}
            <div className="flex justify-end mt-8 space-x-4">
                <button onClick={handleApplyClick} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-600 transition duration-200 ease-in-out">
                    Apply Job
                </button>
                <button
                className='bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-600 transition duration-200 ease-in-out'>
                    Message
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

export default JobSeekerJobDetail;


