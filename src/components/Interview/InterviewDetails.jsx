import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInterviews } from '../../features/interview/interviewSlice';
import { useParams } from 'react-router-dom';

const InterviewDetails = () => {
    const { jobId } = useParams();  // Get the jobId from the URL
    const dispatch = useDispatch();
    const { interviews, status, error } = useSelector((state) => state.interview);
    console.log("interviews", interviews);
    
    useEffect(() => {
        dispatch(fetchUserInterviews());
    }, [dispatch]);

    console.log("jobIIIIId:", jobId, "interviewssssss:", interviews);


    // Filter interviews based on the selected jobId
    const jobInterview = interviews?.find((interview) => interview.job === Number(jobId));
    console.log("jobbbb:", jobInterview);

    if (status === 'loading') {
        return <p className="text-center text-gray-600 mt-10 text-lg">Loading...</p>;
    }

    if (status === 'failed') {
        return <p className="text-center text-red-600 mt-10 text-lg">Error: {error}</p>;
    }

    if (!jobInterview) {
        return <p className="text-center text-gray-600 mt-10 text-lg">No interviews Scheduled. Will Schedule Soon....</p>;
    }

    return (
        <div className="p-6 bg-white min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Your Interview for {jobInterview.job_title} has been Scheduled
            </h2>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{jobInterview.job_title}</h3>
                <div className="space-y-3">
                    <p className="text-gray-700">
                        <span className="font-semibold">Scheduled Date:</span> {new Date(jobInterview.scheduled_date).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Mode:</span> {jobInterview.mode}
                    </p>
                    
                        {jobInterview.mode === 'Virtual' && jobInterview.meeting_link && (
                            <p className="text-blue-600 underline">
                                {jobInterview.meeting_link}
                            </p>
                    )}
                </div>

                <p className="text-gray-700">
                        <span className="font-semibold">Interview Location:</span> {jobInterview.location}
                    </p>

                <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-800 rounded-lg">
                    <p className="text-lg font-semibold">
                        <span className="font-bold">Important:</span> Please be available on time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InterviewDetails;


