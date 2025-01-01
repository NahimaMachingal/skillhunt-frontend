// src/components/Admin/PendingJobs.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingJobs } from '../../features/job/jobSlice';
import { Link } from 'react-router-dom';

const PendingJobs = () => {
    const dispatch = useDispatch();
    const { pendingJobs, status, error } = useSelector((state) => state.job);

    // useEffect to fetch pending jobs when the component mounts
    useEffect(() => {
        dispatch(fetchPendingJobs());
    }, [dispatch]);

    // Filter pending jobs where is_approved is false
    const filteredPendingJobs = pendingJobs.filter((job) => !job.is_approved);

    // Debugging logs to check the status and filtered jobs
    console.log('Status:', status);
    console.log('Filtered Pending Jobs:', filteredPendingJobs);

    

    if (status === 'failed') {
        return <div className="container mx-auto p-4 text-lg text-red-500">Error: {error || 'Failed to load pending jobs'}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">Pending Jobs</h2>
            {filteredPendingJobs.length > 0 ? (
                <ul className="space-y-4">
                    {filteredPendingJobs.map((job, index) => (
                        <li
                            key={job.id}
                            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                        >
                            <h3 className="text-xl font-semibold">
                                <Link to={`/job/${job.id}`} className="text-blue-500 hover:underline">
                                    {index + 1}. {job.title}
                                </Link>
                            </h3>
                            <p className="mt-1 text-gray-600">
                                Posted At: <span className="font-medium">{new Date(job.posted_at).toLocaleDateString()}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-gray-500">No pending jobs found.</p>
            )}
        </div>
    );
};

export default PendingJobs;
