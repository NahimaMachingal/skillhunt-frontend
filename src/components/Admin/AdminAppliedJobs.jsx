// src/components/AdminAppliedJobs.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminApplications } from '../../features/job/jobSlice';

const ApplicationRow = ({ application }) => (
    <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.applicant_name || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.applicant_email || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.employer_company_name || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.employer_username || 'N/A'}</td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.job_title || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.status || 'N/A'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(application.applied_at).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
            <a href={application.resume} target="_blank" rel="noopener noreferrer" className="hover:underline">View Resume</a>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.cover_letter || 'N/A'}</td>
    </tr>
);

const AdminAppliedJobs = () => {
    const dispatch = useDispatch();
    const { adminApplications, status, error } = useSelector((state) => state.job);

    useEffect(() => {
        dispatch(fetchAdminApplications());
    }, [dispatch]);

    

    if (status === 'failed') {
        return <p className="text-center text-red-600">Error: {error}</p>;
    }

    if (adminApplications.length === 0 && status === 'succeeded') {
        return <p className="text-center text-gray-600">No job applications found.</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Job Applications</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobseeker Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobseeker Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover Letter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminApplications.map((application) => (
                            <ApplicationRow key={application.id} application={application} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAppliedJobs;
