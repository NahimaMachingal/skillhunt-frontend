//src/components/Interview/InterviewedCandidates.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviewedCandidates } from '../../features/interview/interviewSlice';
import { useNavigate } from 'react-router-dom';

const InterviewedCandidates = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { interviews, status, error } = useSelector((state) => state.interview);

  useEffect(() => {
    dispatch(fetchInterviewedCandidates());
  }, [dispatch]);

  const handleProvideFeedback = (interviewId) => {
    console.log("candiiiii: ", interviewId)
    navigate(`/feedback/${interviewId}`);
  };

  if (status === 'loading') {
    return <p className="text-center text-gray-600 mt-10 text-lg">Loading...</p>;
  }
  

  if (status === 'failed') {
    return <p className="text-center text-gray-600 mt-10 text-lg">Failed to load candidates. {error}</p>;
  }

  const interviewedCandidates = interviews.filter(interview => interview.status === 'Completed');

  if (interviewedCandidates.length === 0) {
    return <p className="text-center text-gray-600 mt-10 text-lg">No Interviewed candidates</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Interviewed Candidates</h2>
      <div className="space-y-8">
        {interviewedCandidates.map((candidate) => (
          <div key={candidate.id} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {candidate.applicant_name} ({candidate.applicant_email})
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Job:</span> {candidate.job_title}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Interviewed Date:</span> {new Date(candidate.scheduled_date).toLocaleString()}
            </p>
             {/* Check if feedback already exists */}
             <button
                            onClick={() => handleProvideFeedback(candidate.id)}
                            className={`mt-4 px-4 py-2 rounded-lg focus:outline-none ${
                                candidate.has_feedback ? 'bg-gray-400 text-gray-700' : 'bg-blue-500 text-white'
                            }`}
                            disabled={candidate.has_feedback} // Disable button if feedback is already given
                        >
                            {candidate.has_feedback ? 'Feedback Given' : 'Provide Feedback'}
                        </button>

                         {/* If feedback is already given, show a "Review" link */}
                         {candidate.has_feedback && (
                            <a
                                href={`/review/${candidate.id}`}
                                className="ml-2 text-blue-500 hover:text-blue-700 text-sm"
                            >
                                Review
                            </a>
                        )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewedCandidates;
