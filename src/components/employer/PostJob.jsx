// src/components/PostJob.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postJob } from '../../features/job/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners'; 

const PostJob = () => {
    

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.job);
    const [isSubmitting, setIsSubmitting] = useState(false);  // Track submitting state


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
        setIsSubmitting(true); 
        
        dispatch(postJob(values)).then((result) => {
            if (result.type === 'job/postJob/fulfilled') {
                navigate('/jobs');
            }
            setIsSubmitting(false);
        });
    
    };

    return (
        
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Post a Job</h2>
            {status === 'failed' && error && (
    <p className="text-red-500 mb-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Job Title</label>
                    <Field
                        type="text"
                        name="title"

                        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter job title"
                    />

                <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Job Description</label>
    <Field
        as = "textarea"
        name="description"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter description"
        rows="4"
        
    />
    <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
    </div>
    </div>



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Responsibilities</label>
    <Field
        as = "textarea"
        name="responsibilities"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter responsibilities"
        rows="4"
        
    />
    

</div>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Qualifications</label>
    <Field
        as = "textarea"
        name="qualifications"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter qualifications"
        rows="4"
    />
    <ErrorMessage name="qualifications" component="p" className="text-red-500 text-sm" />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Nice to Have</label>
    <Field
        name="nice_to_have"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter nice_to_have"
        rows="4"
    />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Employment Type</label>
    <Field
        as="select"
        name="employment_type"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    
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
             </div>      


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Location</label>
    <Field
        type="text"
        name="location"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter location"
    />
    <ErrorMessage name="location" component="p" className="text-red-500 text-sm" />
    </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Minimum Salary</label>
    <Field
        type="number"
        name="salary_min"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        step="0.01"
    />
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Maximum Salary</label>
    <Field
        type="number"
        name="salary_max"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        step="0.01"
    />
    </div>
</div>
{/* Currency field */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Currency</label>
                        <Field
                            as="select"
                            name="currency"
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="flex items-center text-gray-700 font-medium mb-2">
        <Field
            type="checkbox"
            name="is_remote"
            
            className="mr-2"
        />
        <span>Is this position remote?</span>
    </label>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block mb-2 items-center text-gray-700 font-medium">Application Deadline</label>
    <Field
        type="date"
        name="application_deadline"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">   
<div className="mb-4">
    <label className="block mb-2 items-center text-gray-700 font-medium">Posted At</label>
    <Field
        type="datetime-local"
        name="posted_at"
        
        className="border p-2 w-full"
    
    />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Status</label>
    <Field
        as="select"
        name="status"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        
    >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="pending">Pending</option>
        <option value="archived">Archived</option>
    </Field>
</div>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Experience Level</label>
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
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="mb-4">
    <label className="block mb-2">Job Function</label>
    <Field
        type="text"
        name="job_function"
        
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter job function"
    />
</div>
</div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition duration-150"
               
               disabled={isSubmitting}  // Disable button when submitting
               >
                   {isSubmitting ? (
                       <div className="flex justify-center">
                           <PulseLoader color="#fff" size={10} />  {/* Replace with your preferred loader */}
                       </div>
                   ) : (
                       "Post Job"
                   )}
               </button>
            </Form>
            </Formik>
        </div>
    );
};

export default PostJob;
