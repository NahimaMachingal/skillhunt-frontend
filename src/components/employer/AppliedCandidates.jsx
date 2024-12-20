//src/components/employer/AppliedCandidates.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedCandidates } from '../../features/job/jobSlice';
import { useNavigate } from 'react-router-dom';

const AppliedCandidates = () => {
  const dispatch = useDispatch();
  const appliedCandidates = useSelector((state) => state.job.appliedCandidates || []);
  const loading = useSelector((state) => state.job.loading);
  const error = useSelector((state) => state.job.error);
  const navigate = useNavigate();
  

  useEffect(() => {
    dispatch(fetchAppliedCandidates());
  }, [dispatch]);

  useEffect(() => {
    console.log("Applied Candidates:", appliedCandidates);
  }, [appliedCandidates]);

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}/applicants`);
  };
// Filter out jobs that are inactive (is_active is false)
const activeAppliedCandidates = appliedCandidates.filter((job) => job.is_active === true);
  // Extract unique job titles
  const uniqueJobTitles = activeAppliedCandidates.length
    ? [...new Map(activeAppliedCandidates.map((job) => [job?.job_title, job])).values()]
    : [];

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Applied Jobs</h2>
      {uniqueJobTitles.length > 0 ? (
        <ul className="space-y-4">
          {uniqueJobTitles.map((job) => (
            <li key={job.job_id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <button
                onClick={() => handleJobClick(job.job_id)}
                className="text-xl font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                {job.job_title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default AppliedCandidates;

