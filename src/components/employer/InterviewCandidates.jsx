// src/components/employer/InterviewCandidates.jsx

// src/components/employer/InterviewCandidates.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAppliedCandidates } from "../../features/job/jobSlice";
import { useNavigate } from 'react-router-dom';

const InterviewCandidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appliedCandidates = useSelector((state) => state.job.appliedCandidates || []);
  const loading = useSelector((state) => state.job.loading);
  const error = useSelector((state) => state.job.error);

  const handleScheduleInterview = () => {
    navigate('/schedule/interview');
  };

  // Filter applicants with status "Interview"
  const interviewCandidates = appliedCandidates.filter((candidate) => candidate.status === "Interview");

  useEffect(() => {
    dispatch(fetchAppliedCandidates());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-lg text-blue-500 animate-pulse">Loading candidates...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 font-semibold">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
        Interview Candidates
      </h2>
      {interviewCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {interviewCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-xl font-semibold text-gray-800 mb-4 text-center">{candidate.applicant_name}</p>
              <div className="text-center">
                <button
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300"
                  onClick={handleScheduleInterview}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No interview candidates available at the moment.</p>
      )}
    </div>
  );
};

export default InterviewCandidates;
