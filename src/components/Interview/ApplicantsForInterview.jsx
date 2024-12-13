//src/components/interview/ApplicantsForInterview.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployerInterviews } from '../../features/interview/interviewSlice';
import { useParams } from 'react-router-dom';

const ApplicantsForInterview = () => {
    const { jobId } = useParams(); // Get jobId from the URL
    const dispatch = useDispatch();
    const { interviews, status, error } = useSelector((state) => state.interview);

    useEffect(() => {
        if (jobId) {
            dispatch(fetchEmployerInterviews(jobId));
        }
    }, [dispatch, jobId]);

    if (status === 'loading') {
        return <p className="text-center text-gray-600 mt-10 text-lg">Loading...</p>;
    }

    if (status === 'failed') {
        return <p className="text-center text-gray-600 mt-10 text-lg">No interviews found</p>;
    }
    

    if (!interviews || interviews.length === 0) {
        return <p className="text-center text-gray-600 mt-10 text-lg">No interviews found.</p>;
    }

    return (
        <div className="p-6 bg-white min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Interview Details 
            </h2>
            <div className="space-y-6">
                {interviews.map((interview) => (
                    <div
                        key={interview.id}
                        className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md"
                    >
                        <h3 className="text-xl font-bold text-gray-800">
                            {interview.applicant_name} ({interview.applicant_email})
                        </h3>
                        <p className="text-gray-700">
                            <span className="font-semibold">Scheduled Date:</span>{' '}
                            {new Date(interview.scheduled_date).toLocaleString()}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Mode:</span> {interview.mode}
                        </p>
                        {interview.mode === 'Virtual' && interview.meeting_link && (
                            <p className="text-blue-600 underline">
                                {interview.meeting_link}
                            </p>

                            
                        )}


{interview.mode === 'In-person' && (
    <p className="text-gray-700">
        <span className="font-semibold">Location:</span> {interview.location}
    </p>
)}





                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicantsForInterview;
