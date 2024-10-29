// src/components/jobseeker/JobApplicationForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitJobApplication } from '../../features/job/jobSlice';
import { useNavigate, useParams } from 'react-router-dom';

const JobApplicationForm = () => {
    const { id } = useParams(); // Get job ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form state
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!resume) {
            alert('Please upload your resume.');
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append('job', id);
        formData.append('resume', resume);
        formData.append('cover_letter', coverLetter);

        // Dispatch action to submit the job application
        dispatch(submitJobApplication(formData))
            .then(() => {
                alert('Application submitted successfully!');
                navigate('/home'); // Redirect to home page
            })
            .catch((error) => {
                console.error('Failed to submit application:', error);
                alert('Failed to submit application. Please try again.');
            });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Apply for Job</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2">Resume:</label>
                    <input
                        type="file"
                        id="resume"
                        onChange={(e) => setResume(e.target.files[0])}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="coverLetter" className="block text-gray-700 font-semibold mb-2">Cover Letter:</label>
                    <textarea
                        id="coverLetter"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out">
                    Apply
                </button>
            </form>
        </div>
    );
};

export default JobApplicationForm;
