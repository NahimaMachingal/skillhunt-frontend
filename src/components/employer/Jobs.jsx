// src/components/Jobs.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../features/job/jobSlice'; // Assuming you have an action to fetch jobs
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, status, error } = useSelector((state) => state.job);
  const user = useSelector((state) => state.auth.user);

  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filter jobs by the logged-in employer's ID
  const employerJobs = jobs.filter((job) => job.employer_id === user?.id && job.is_active === true);

  const handleJobClick = (JobId) =>{
    navigate(`/edit-job/${JobId}`);
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Posted Jobs</h1>
      
      {status === 'loading' && <p className="text-gray-500 text-center">Loading jobs...</p>}
      {status === 'failed' && <p className="text-red-500 text-center">Error: {error}</p>}
      {status === 'succeeded' && employerJobs.length === 0 && <p className="text-gray-500 text-center">No jobs found.</p>}
      
      {status === 'succeeded' && employerJobs.length > 0 && (
        <ul className="space-y-4">
          {employerJobs.map((job, index) => (
            <li 
              key={job.id} 
              className="flex justify-between items-center p-4 bg-white shadow-md rounded-md hover:bg-gray-50"
            >
              <div>
                <strong className="text-lg font-medium text-gray-800 cursor-pointer hover:underline"
                onClick={()=> handleJobClick(job.id)}
                >
                  {index + 1}. {job.title}
                </strong>
                <p className="text-sm text-gray-500">Posted At: {new Date(job.posted_at).toLocaleDateString()}</p>
              </div>
              <button 
                className={`px-4 py-2 rounded-md font-semibold ${job.is_approved ? 'bg-green-500' : 'bg-red-500'} text-white`}
              >
                {job.is_approved ? 'Approved' : 'Pending'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Jobs;
