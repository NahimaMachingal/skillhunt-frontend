// src/components/PostJob.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postJob } from '../../features/job/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PostJob = () => {
    

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.job);

    const validationSchema = Yup.object({
        title: Yup.string().required('Job title is required'),
        description: Yup.string().required('Job description is required').min(20, 'Job description must be at least 50 characters long'),
        qualifications: Yup.string().required('Job qualifications are required'),
        employment_type: Yup.string().required('Employment type is required'),
        posted_at: Yup.string().required('Posting date is required'),
        location: Yup.string().required('Location is required'),
        salary_min: Yup.number().optional(),
        salary_max: Yup.number().optional(),
        is_remote: Yup.boolean().optional(),
        application_deadline: Yup.date().optional(),
        experience_level: Yup.string().optional(),
        job_function: Yup.string().optional(),
        currency: Yup.string().required('Currency is required'),
    });


    

    const handleSubmit = (values) => {
       
        
        dispatch(postJob(values)).then((result) => {
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

<Formik
                initialValues={{
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
                    currency: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >


            <Form>
                <div className="mb-4">
                    <label className="block mb-2">Job Title</label>
                    <Field
                        type="text"
                        name="title"

                        className="border p-2 w-full"
                    />

                <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />
                </div>

                
                
                <div className="mb-4">
    <label className="block mb-2">Job Description</label>
    <Field
        as = "textarea"
        name="description"
        className="border p-2 w-full"
        rows="5"
        
    />
    <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
    </div>

<div className="mb-4">
    <label className="block mb-2">Responsibilities</label>
    <Field
        as = "textarea"
        name="responsibilities"
        
        className="border p-2 w-full"
        rows="5"
        
    />
    


</div>

<div className="mb-4">
    <label className="block mb-2">Qualifications</label>
    <Field
        as = "textarea"
        name="qualifications"
        className="border p-2 w-full"
        rows="5"
    />
    <ErrorMessage name="qualifications" component="p" className="text-red-500 text-sm" />
</div>
<div className="mb-4">
    <label className="block mb-2">Nice to Have</label>
    <Field
        name="nice_to_have"
        
        className="border p-2 w-full"
        rows="5"
    />
</div>
<div className="mb-4">
    <label className="block mb-2">Employment Type</label>
    <Field
        as="select"
        name="employment_type"
        
        className="border p-2 w-full"
    
    >
        <option value="" disabled>Select employment type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Temporary">Temporary</option>
        <option value="Internship">Internship</option>
        <option value="Freelance">Freelance</option>
    </Field>

    <ErrorMessage name="employment_type" component="p" className="text-red-500 text-sm" />
                    </div>

<div className="mb-4">
    <label className="block mb-2">Location</label>
    <Field
        type="text"
        name="location"
        
        className="border p-2 w-full"
    />
    <ErrorMessage name="location" component="p" className="text-red-500 text-sm" />
    </div>


<div className="mb-4">
    <label className="block mb-2">Minimum Salary</label>
    <Field
        type="number"
        name="salary_min"
        
        className="border p-2 w-full"
        step="0.01"
    />
</div>

<div className="mb-4">
    <label className="block mb-2">Maximum Salary</label>
    <Field
        type="number"
        name="salary_max"
        
        className="border p-2 w-full"
        step="0.01"
    />
    
</div>
{/* Currency field */}
<div className="mb-4">
                        <label className="block mb-2">Currency</label>
                        <Field
                            as="select"
                            name="currency"
                            className="border p-2 w-full"
                        >
                            <option value="" disabled>Select currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                            <option value="AED">AED</option>
                            <option value="AUD">AUD</option>
                            {/* Add other currencies as needed */}
                        </Field>
                        <ErrorMessage name="currency" component="p" className="text-red-500 text-sm" />
                    </div>

<div className="mb-4">
    <label className="flex items-center">
        <Field
            type="checkbox"
            name="is_remote"
            
            className="mr-2"
        />
        <span>Is this position remote?</span>
    </label>
</div>
<div className="mb-4">
    <label className="block mb-2">Application Deadline</label>
    <Field
        type="date"
        name="application_deadline"
        
        className="border p-2 w-full"
    />
    </div>
<div className="mb-4">
    <label className="block mb-2">Posted At</label>
    <Field
        type="datetime-local"
        name="posted_at"
        
        className="border p-2 w-full"
    
    />
</div>

<div className="mb-4">
    <label className="block mb-2">Status</label>
    <Field
        as="select"
        name="status"
        
        className="border p-2 w-full"
        
    >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="pending">Pending</option>
        <option value="archived">Archived</option>
    </Field>
</div>



<div className="mb-4">
    <label className="block mb-2">Experience Level</label>
    <Field
    as="select"
        name="experience_level"
       
        className="border p-2 w-full"
    >
        <option value="">Select experience level</option> {/* Default option */}
        <option value="Entry level">Entry level</option>
        <option value="Mid level">Mid level</option>
        <option value="Senior level">Senior level</option>
        <option value="Executive">Executive</option>
    </Field>
</div>
<div className="mb-4">
    <label className="block mb-2">Job Function</label>
    <Field
        type="text"
        name="job_function"
        
        className="border p-2 w-full"
        placeholder="Enter job function"
    />
</div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
               
                    Post Job
                </button>
            </Form>
            </Formik>
        </div>
    );
};

export default PostJob;
