//src/components/Interview/FeedbackForm.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { submitFeedback } from '../../features/interview/interviewSlice';

const FeedbackForm = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(3);
  const [comments, setComments] = useState('');

  // Access feedback status and error from state
  const feedbackStatus = useSelector((state) => state.interview.feedbackStatus);
  const feedbackError = useSelector((state) => state.interview.feedbackError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(submitFeedback({ interviewId, rating, comments }));
    console.log("ooooooooooooooo1: ",interviewId)
    console.log("ooooooooooooooo2: ",rating)
    console.log("oooooooooooooooooooooooo3:", comments)
      navigate('/interviewedcandidates');
    
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Provide Feedback</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <label className="block text-gray-700 font-semibold mb-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded-lg mb-4"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <label className="block text-gray-700 font-semibold mb-2">Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
          rows="4"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={feedbackStatus === 'loading'}
        >
          {feedbackStatus === 'loading' ? 'Submitting...' : 'Submit Feedback'}
        </button>
        {feedbackError && (
          <p className="text-red-500 text-center mt-4">{feedbackError}</p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;


