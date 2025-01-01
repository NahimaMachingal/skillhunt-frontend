import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createOrUpdateAboutMe, fetchAboutMe } from '../../features/resume/resumeSlice';
import { useNavigate } from 'react-router-dom';

const AboutMe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(fetchAboutMe());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      position: '',
      about: '',
      profile_pic: null,
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Full name is required'),
      position: Yup.string().required('Position is required'),
      about: Yup.string().required('About is required'),
      profile_pic: Yup.mixed().test(
        'fileType',
        'A profile picture is required',
        (value) => typeof value === 'string' || value instanceof File
      ),
    }),
    onSubmit: (values) => {
      const form = new FormData();
      form.append('full_name', values.full_name);
      form.append('position', values.position);
      form.append('about', values.about);
      if (values.profile_pic && values.profile_pic instanceof File) {
        form.append('profile_pic', values.profile_pic);
    }

      dispatch(createOrUpdateAboutMe(form)).then(() => navigate('/address'));
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        full_name: data.full_name || '',
        position: data.position || '',
        about: data.about || '',
        profile_pic: data.profile_pic || null,
      });
    }
  }, [data, formik.setValues]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data && !loading) {
    return <div>No data found. Please fill out your profile.</div>;
  }

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="bg-gray shadow-lg rounded-lg w-full max-w-4xl">
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-2xl font-bold text-gray-800">Complete Your Profile</h1>
          <p className="text-sm text-gray-500">Unlock 500+ Jobs From Top Companies</p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="bg-white p-4 lg:w-1/3 border-r">
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 font-semibold">✔</span>
                <p className="text-gray-600 text-sm">Take 4 Steps</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 font-semibold">✔</span>
                <p className="text-gray-600 text-sm">Direct Call From HR</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 font-semibold">✔</span>
                <p className="text-gray-600 text-sm">Connect With Top Companies</p>
              </li>
            </ul>
          </div>

          <div className="p-8 flex-1 bg-green-100 ">
            <div className="flex justify-between mb-4">
              {['About Me', 'Address', 'Skills', 'Projects', 'Education', 'Experience'].map((step, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center text-sm font-semibold ${
                    step === 'About Me' ? 'text-white bg-green-500 rounded-full px-2 py-1' : 'text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-5">About Me</h2>
            <form className="space-y-3" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600">First Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {formik.touched.full_name && formik.errors.full_name && (
                  <p className="text-red-500 text-sm">{formik.errors.full_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Backend Developer"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
                {formik.touched.position && formik.errors.position && (
                  <p className="text-red-500 text-sm">{formik.errors.position}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">About</label>
                <textarea
                  name="about"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Tell us about yourself"
                  className="w-full border rounded-md px-3 py-1 h-24 focus:outline-none focus:ring focus:ring-blue-200"
                />
                {formik.touched.about && formik.errors.about && (
                  <p className="text-red-500 text-sm">{formik.errors.about}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Profile Picture</label>
                {formik.values.profile_pic && typeof formik.values.profile_pic === 'string' && (
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${formik.values.profile_pic}`}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full mb-2"
                  />
                )}
                <input
                  type="file"
                  name="profile_pic"
                  onChange={(event) => {
                    formik.setFieldValue('profile_pic', event.currentTarget.files[0]);
                  }}
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
                {formik.touched.profile_pic && formik.errors.profile_pic && (
                  <p className="text-red-500 text-sm">{formik.errors.profile_pic}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
