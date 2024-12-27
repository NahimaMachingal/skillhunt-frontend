// src/components/Interview/FeedbackReview.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFeedback } from '../../features/interview/interviewSlice';
import { fetchProfile } from '../../features/employerprofile/employerProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

const FeedbackReview = () => {
    const { interviewId } = useParams(); // Access interviewId from URL params
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.profile);
    console.log("dddrrrr:", data)
    const { feedback, feedbackStatus, feedbackError } = useSelector(
      (state) => state.interview
    );

    useEffect(() => {
        dispatch(fetchFeedback(interviewId)); // Fetch feedback when the component mounts
      }, [dispatch, interviewId]);

      useEffect(() => {
        dispatch(fetchProfile()); // Fetch feedback when the component mounts
      }, [dispatch]);


  if (feedbackStatus === 'loading') {
    return <p className="text-center text-gray-600 mt-10 text-lg">Loading feedback...</p>;
  }

  if (feedbackStatus === 'failed') {
    return <p className="text-center text-red-600 mt-10 text-lg">{feedbackError}</p>;
  }

  if (!feedback) {
    return <p className="text-center text-gray-600 mt-10 text-lg">No feedback available.</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Feedback Review</h2>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Interview Feedback</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Interviewer Email:</span> {feedback.interviewer_email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Interviewer Name:</span> {data.user.first_name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Rating:</span> {feedback.rating}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Comments:</span> {feedback.comments || 'No comments provided.'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Feedback Given At:</span> {new Date(feedback.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default FeedbackReview;
