//src/components/interview/ApplicantsForInterview.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployerInterviews, updateInterviewStatus } from '../../features/interview/interviewSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicantsForInterview = () => {
    const { jobId } = useParams(); // Get jobId from the URL
    const dispatch = useDispatch();
    const { interviews, status, error } = useSelector((state) => state.interview);

    useEffect(() => {
        if (jobId) {
            console.log("iiiddddd", jobId)
            dispatch(fetchEmployerInterviews(jobId));
        }
    }, [dispatch, jobId]);

    const handleStatusChange = (interviewId, newStatus) => {
        dispatch(updateInterviewStatus({ interviewId, newStatus }))
        .then(() => toast.success('Interview status updated successfully!'))
            .catch(() => toast.error('Failed to update interview status.'));
    };

    if (status === 'loading') {
        return <p className="text-center text-gray-600 mt-10 text-lg">Loading...</p>;
    }

    if (status === 'failed') {
        return <p className="text-center text-gray-600 mt-10 text-lg">No interviews found</p>;
    }

    // Filter interviews with status "Interview"
    const filteredInterviews = interviews.filter(interview => interview.jobApplicationStatus === 'interview');
    console.log("fff:", interviews.jobApplicationStatus)

    

    if (!filteredInterviews || filteredInterviews.length === 0) {
        return <p className="text-center text-gray-600 mt-10 text-lg">No interviews found.</p>;
    }

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
                Interview Details 
            </h2>
            <div className="space-y-8">
                {filteredInterviews.map((interview) => (
                    <div
                        key={interview.id}
                        className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            {interview.applicant_name} ({interview.applicant_email})
                        </h3>
                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Job:</span> {interview.job_title}
                        </p> 
                        
                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Scheduled Date:</span>{' '}
                            {new Date(interview.scheduled_date).toLocaleString()}
                        </p>
                        
                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Mode:</span> {interview.mode}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-semibold">Interview Status:</span>{' '}
                            <select
                                value={interview.status}
                                onChange={(e) => handleStatusChange(interview.id, e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition"
                                >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
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
