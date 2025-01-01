// `src/features/admin/AdminJobList.jsx`
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminJobs } from '../../features/job/jobSlice';

const AdminJobList = () => {
  const dispatch = useDispatch();
  const { adminJobs, status, error } = useSelector((state) => state.job);

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 10;

  useEffect(() => {
    
      dispatch(fetchAdminJobs());
    
  }, [dispatch]);

  // Calculate the current jobs to display based on the current page
  const startIndex = currentPage * jobsPerPage;
  const currentJobs = adminJobs.slice(startIndex, startIndex + jobsPerPage);

  // Check if there are more jobs to display for the next page
  const hasMoreJobs = startIndex + jobsPerPage < adminJobs.length;

  // Handle "Next" button click
  const handleNext = () => {
    if (hasMoreJobs) {
      setCurrentPage(currentPage + 1);
    }
  };

  let content;
   if (status === 'succeeded') {
    content = (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Responsibilities</th>
            <th className="py-2 px-4 border-b">Qualifications</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Salary</th>
            <th className="py-2 px-4 border-b">Employment Type</th>
            <th className="py-2 px-4 border-b">Remote</th>
            <th className="py-2 px-4 border-b">Experience Level</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Posted At</th>
            <th className="py-2 px-4 border-b">Application Deadline</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <tr key={job.id}>
                <td className="py-2 px-4 border-b">{startIndex + index + 1}</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b">{job.responsibilities || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{job.qualifications || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{job.location || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  {job.currency} {job.salary_min && job.salary_max
                    ? `${job.salary_min} - ${job.salary_max}`
                    : 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">{job.employment_type}</td>
                <td className="py-2 px-4 border-b">
                  {job.is_remote ? 'Yes' : 'No'}
                </td>
                <td className="py-2 px-4 border-b">
                  {job.experience_level || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b">{job.is_active ? 'Active' : 'Deleted'}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(job.posted_at).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {job.application_deadline
                    ? new Date(job.application_deadline).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center py-4 text-gray-500">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  } else if (status === 'failed') {
    content = <p className="text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-cyan-800 mb-6">
        Admin Job Dashboard
      </h1>

      <div className="w-11/12 bg-white shadow-md rounded-lg p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Job List
          </h2>
          {/* Next Button */}
          {hasMoreJobs && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
        {content}
      </div>
    </div>
  );
};

export default AdminJobList;

