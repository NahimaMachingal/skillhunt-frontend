import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchJobById, updateJob, deleteJob } from '../../features/job/jobSlice';

const EditJobDetail = () => {
  const { id } = useParams(); // Job ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job, status, error } = useSelector((state) => state.job);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    // Fetch job details
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Set initial values when job data is fetched
    if (job) {
      setInitialValues({
        title: job.title || '',
        description: job.description || '',
        responsibilities: job.responsibilities || '',
        qualifications: job.qualifications || '',
        nice_to_have: job.nice_to_have || '',
        employment_type: job.employment_type || '',
        location: job.location || '',
        salary_min: job.salary_min || '',
        salary_max: job.salary_max || '',
        is_remote: job.is_remote || false,
        application_deadline: job.application_deadline || '',
        posted_at: job.posted_at || '',
        status: job.status || 'open',
        experience_level: job.experience_level || '',
        job_function: job.job_function || '',
        currency: job.currency || '',
      });
    }
  }, [job]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Job title is required'),
    description: Yup.string().required('Job description is required'),
    qualifications: Yup.string().required('Job qualifications are required'),
    employment_type: Yup.string().required('Employment type is required'),
    location: Yup.string().required('Location is required'),
    salary_min: Yup.number().optional(),
    salary_max: Yup.number().optional(),
    currency: Yup.string().required('currency is required'),
  });

  const handleSubmit = (values) => {
    dispatch(updateJob({ id, ...values })).then((result) => {
      if (result.type === 'job/updateJob/fulfilled') {
        navigate(`/edit-job/${id}`);
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(id)).then((result) => {
        if (result.type === 'job/deleteJob/fulfilled') {
          navigate('/jobs'); // Redirect to jobs list after deletion
        }
      });
    }
  };

  if (!initialValues) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Details</h2>
      {status === 'failed' && error && (
        <p className="text-red-500">
          {typeof error === 'object' ? error.detail || 'An error occurred' : error}
        </p>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div className="mb-4">
            <label className="block mb-2">Job Title</label>
            <Field type="text" name="title" className="border p-2 w-full" />
            <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block mb-2"> Job Description</label>
            <Field type="text" name="description" className="border p-2 w-full" />
            <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label className="block mb-2"> Job Responsibilities</label>
            <Field type="text" name="responsibilities" className="border p-2 w-full" />
            <ErrorMessage name="responsibilities" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <div className="flex gap-4">  

            <div className="flex-1">
            <label className="block mb-2"> Qualifications</label>
            <Field type="text" name="qualifications" className="border p-2 w-full" />
            <ErrorMessage name="qualifications" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex-1">
            <label className="block mb-2"> Nice to Have</label>
            <Field type="text" name="nice_to_have" className="border p-2 w-full" />
            <ErrorMessage name="nice_to_have" component="p" className="text-red-500 text-sm" />
          </div>
          </div>
          </div>


          <div className="mb-4">
            <div className="flex gap-4">  

            <div className="flex-1">
            <label className="block mb-2"> Employment Type</label>
            <Field type="text" name="employment_type" className="border p-2 w-full" />
            <ErrorMessage name="employment_type" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex-1">
            <label className="block mb-2"> Job Location</label>
            <Field type="text" name="location" className="border p-2 w-full" />
            <ErrorMessage name="location" component="p" className="text-red-500 text-sm" />
          </div>
          </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-4">  

            <div className="flex-1">
            <label className="block mb-2"> Currency</label>
            <Field type="text" name="currency" className="border p-2 w-full" />
            <ErrorMessage name="currency" component="p" className="text-red-500 text-sm" />
          </div>

            <div className="flex-1">
            <label className="block mb-2"> Minimum Salary</label>
            <Field type="text" name="salary_min" className="border p-2 w-full" />
            <ErrorMessage name="salary_min" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex-1">
            <label className="block mb-2">Maximum Salary</label>
            <Field type="text" name="salary_max" className="border p-2 w-full" />
            <ErrorMessage name="salary_max" component="p" className="text-red-500 text-sm" />
          </div>
          </div>
          </div>
          

<div className="mb-4 flex items-center">
  <Field 
    type="checkbox" 
    name="is_remote" 
    className="mr-2" 
  />
  <label className="mb-0">Is Remote</label>
  <ErrorMessage 
    name="is_remote" 
    component="p" 
    className="text-red-500 text-sm ml-4" 
  />
</div>

<div className="mb-4">
            <div className="flex gap-4">  

            <div className="flex-1">
            <label className="block mb-2"> Application Deadline</label>
            <Field type="text" name="application_deadline" className="border p-2 w-full" />
            <ErrorMessage name="application_deadline" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex-1">
            <label className="block mb-2">Job Posted At </label>
            <Field type="text" name="posted_at" className="border p-2 w-full" />
            <ErrorMessage name="posted_at" component="p" className="text-red-500 text-sm" />
          </div>
          </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-4">  

            <div className="flex-1">
            <label className="block mb-2"> Job Status</label>
            <Field type="text" name="status" className="border p-2 w-full" />
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>

          <div className="flex-1">
            <label className="block mb-2">Experience Level </label>
            <Field type="text" name="experience_level" className="border p-2 w-full" />
            <ErrorMessage name="experience_level" component="p" className="text-red-500 text-sm" />
          </div>
          </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2"> Job Function</label>
            <Field type="text" name="job_function" className="border p-2 w-full" />
            <ErrorMessage name="job_function" component="p" className="text-red-500 text-sm" />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Job
            </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditJobDetail;
