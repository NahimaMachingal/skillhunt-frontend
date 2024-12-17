// src/components/jobseeker/JobApplicationForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { submitJobApplication } from '../../features/job/jobSlice';
import { useNavigate, useParams } from 'react-router-dom';

const JobApplicationForm = () => {
    const { id } = useParams(); // Get job ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form state
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [questions, setQuestions] = useState({});  // Initialize questions as an object to store multiple questions
    const { status, error } = useSelector(state => state.job);  // Accessing status and error from job state slice


    // Handle input change for questions
    const handleQuestionChange = (e) => {
        setQuestions({
            ...questions,
            [e.target.name]: e.target.value,
        });
    };


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
        formData.append('questions', JSON.stringify(questions));
        


        // Dispatch action to submit the job application
        dispatch(submitJobApplication(formData))
            .then(() => {
                toast.success('Application submitted successfully!',
                    {
                        autoClose: 3000, // Automatically close after 3 seconds
                    }
                );

                navigate('/home'); // Redirect to home page
            })
            .catch((error) => {
                console.error('Failed to submit application:', error);
                toast.error('Failed to submit application. Please try again.'); // Error toast
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
                <h1 className="text-2xl font-bold mb-4">Questions From the Employer</h1>
                {/* Example Questions */}
                <div className="mb-4">
                    <label htmlFor="experience" className="block text-gray-700 font-semibold mb-2">How many Years of Experience Do you have?</label>
                    <input
                        type="text"
                        name="experience"
                        onChange={handleQuestionChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="arabic" className="block text-gray-700 font-semibold mb-2">Do you speak Arabic?</label>
                    <input
                        type="text"
                        name="arabic"
                        onChange={handleQuestionChange}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                {status === 'failed' && <p className="error text-red-600">{error}</p>}

                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out">
                    Apply
                </button>
            </form>
        </div>
    );
};

export default JobApplicationForm;
