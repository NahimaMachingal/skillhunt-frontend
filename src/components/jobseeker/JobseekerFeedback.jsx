import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacksForJobseeker } from '../../features/feedback/feedbackSlice';

const JobseekerFeedback = () => {
  const dispatch = useDispatch();
  const { feedbacks = [], status = 'idle', error = null } = useSelector((state) => state.feedback || {});

  useEffect(() => {
    dispatch(fetchFeedbacksForJobseeker());
  }, [dispatch]);

  if (status === 'loading') {
    return <p className="text-center text-gray-600 mt-10 text-lg">Loading feedbacks...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-red-600 mt-10 text-lg">{error}</p>;
  }

  if (!feedbacks || feedbacks.length === 0) {
    return <p className="text-center text-gray-600 mt-10 text-lg">No feedbacks available.</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">Your Feedbacks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{feedback.job_title}</h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-blue-600">Interviewer Name:</span> {feedback.interviewer_name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-blue-600">Rating:</span> {feedback.rating}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-blue-600">Comments:</span> {feedback.comments}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-blue-600">Interviewed Date:</span> {new Date(feedback.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobseekerFeedback;
