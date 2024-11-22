// src/components/AppliedCandidates.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedCandidates, updateApplicationStatus } from '../../features/job/jobSlice';

const AppliedCandidates = () => {
    const dispatch = useDispatch();
    const appliedCandidates = useSelector((state) => state.job.appliedCandidates);
    const loading = useSelector((state) => state.job.loading);
    const error = useSelector((state) => state.job.error);

    useEffect(() => {
        dispatch(fetchAppliedCandidates());
    }, [dispatch]);

    const handleStatusChange = (applicationId, newStatus) => {
        dispatch(updateApplicationStatus({ applicationId, status: newStatus }));
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;


    // Sort appliedCandidates by 'applied_at' in descending order
    const sortedCandidates = [...appliedCandidates].sort(
        (a, b) => new Date(b.applied_at) - new Date(a.applied_at)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Applied Candidates</h2>
            {sortedCandidates.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Applicant Name</th>
                                <th className="py-3 px-6 text-left">Applicant Email</th>
                                <th className="py-3 px-6 text-left">Job Title</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Applied At</th>
                                <th className="py-3 px-6 text-left">Experience</th>
                                <th className="py-3 px-6 text-left">Arabic</th>
                                <th className="py-3 px-6 text-left">Resume</th>
                                <th className="py-3 px-6 text-left">Cover Letter</th>
                                
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {sortedCandidates.map((application) => (
                                <tr key={application.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{application.applicant_name}</td>
                                    <td className="py-3 px-6">{application.applicant_email}</td>
                                    <td className="py-3 px-6">{application.job_title}</td>
                                    <td className="py-3 px-6">
                                        <select
                                            value={application.status}
                                            onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Reviewed">Reviewed</option>
                                            <option value="Interview">Interview</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    
                                    <td className="py-3 px-6">{new Date(application.applied_at).toLocaleString()}</td>
                                    <td className="py-3 px-6">
                                        {application.questions?.experience || 'N/A'}
                                    </td>
                                    <td className="py-3 px-6">
                                        {application.questions?.arabic || 'N/A'}
                                    </td>
                                    <td className="py-3 px-6">
                                        <a href={application.resume} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                            Download Resume
                                        </a>
                                    </td>
                                    <td className="py-3 px-6">{application.cover_letter || 'No cover letter provided'}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No candidates have applied for your jobs yet.</p>
            )}
        </div>
    );
};

export default AppliedCandidates;


