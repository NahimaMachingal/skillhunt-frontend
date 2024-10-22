// src/components/PostJob.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postJob } from '../../features/job/jobSlice';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        responsibilities: '',
        qualifications: '',
        nice_to_have: '',
        employment_type: '',
        location: '',
        salary_min: '',
        salary_max: '',
        is_remote: false,
        application_deadline: '',
        posted_at: '',
        status: 'open',
        experience_level: '',
        job_function: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.job);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postJob(formData)).then((result) => {
            if (result.type === 'job/postJob/fulfilled') {
                navigate('/jobs');
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
            {status === 'failed' && error && (
    <p className="text-red-500">
        {typeof error === 'object' ? error.detail || 'An error occurred' : error}
    </p>
)}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>

                
                
                <div className="mb-4">
    <label className="block mb-2">Job Description</label>
    <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full"
        rows="5"
        required
    />
</div>

<div className="mb-4">
    <label className="block mb-2">Responsibilities</label>
    <textarea
        name="responsibilities"
        value={formData.responsibilities || ""}
        onChange={handleChange}
        className="border p-2 w-full"
        rows="5"
    />
</div>

<div className="mb-4">
    <label className="block mb-2">Qualifications</label>
    <textarea
        name="qualifications"
        value={formData.qualifications || ""}
        onChange={handleChange}
        className="border p-2 w-full"
        rows="5"
    />
</div>
<div className="mb-4">
    <label className="block mb-2">Nice to Have</label>
    <textarea
        name="nice_to_have"
        value={formData.nice_to_have || ""}
        onChange={handleChange}
        className="border p-2 w-full"
        rows="5"
    />
</div>
<div className="mb-4">
    <label className="block mb-2">Employment Type</label>
    <select
        name="employment_type"
        value={formData.employment_type || ""}
        onChange={handleChange}
        className="border p-2 w-full"
        required
    >
        <option value="" disabled>Select employment type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Temporary">Temporary</option>
        <option value="Internship">Internship</option>
        <option value="Freelance">Freelance</option>
    </select>
</div>

<div className="mb-4">
    <label className="block mb-2">Location</label>
    <input
        type="text"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
        className="border p-2 w-full"
    />
</div>


<div className="mb-4">
    <label className="block mb-2">Minimum Salary</label>
    <input
        type="number"
        name="salary_min"
        value={formData.salary_min || ""}
        onChange={handleChange}
        className="border p-2 w-full"
        step="0.01"
    />
</div>

<div className="mb-4">
    <label className="block mb-2">Maximum Salary</label>
    <input
        type="number"
        name="salary_max"
        value={formData.salary_max || ""}
        onChange={handleChange}
        className="border p-2 w-full"
        step="0.01"
    />
</div>

<div className="mb-4">
    <label className="flex items-center">
        <input
            type="checkbox"
            name="is_remote"
            checked={formData.is_remote || false}
            onChange={handleChange}
            className="mr-2"
        />
        <span>Is this position remote?</span>
    </label>
</div>
<div className="mb-4">
    <label className="block mb-2">Application Deadline</label>
    <input
        type="date"
        name="application_deadline"
        value={formData.application_deadline || ""}
        onChange={handleChange}
        className="border p-2 w-full"
    />
</div>
<div className="mb-4">
    <label className="block mb-2">Posted At</label>
    <input
        type="datetime-local"
        name="posted_at"
        value={formData.posted_at ? formData.posted_at.slice(0, 16) : ""}
        onChange={handleChange}
        className="border p-2 w-full"
        required
    />
</div>

<div className="mb-4">
    <label className="block mb-2">Status</label>
    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full"
        required
    >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="pending">Pending</option>
        <option value="archived">Archived</option>
    </select>
</div>



<div className="mb-4">
    <label className="block mb-2">Experience Level</label>
    <select
        name="experience_level"
        value={formData.experience_level}
        onChange={handleChange}
        className="border p-2 w-full"
    >
        <option value="">Select experience level</option> {/* Default option */}
        <option value="Entry level">Entry level</option>
        <option value="Mid level">Mid level</option>
        <option value="Senior level">Senior level</option>
        <option value="Executive">Executive</option>
    </select>
</div>
<div className="mb-4">
    <label className="block mb-2">Job Function</label>
    <input
        type="text"
        name="job_function"
        value={formData.job_function}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Enter job function"
    />
</div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default PostJob;
