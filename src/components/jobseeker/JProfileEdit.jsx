// src/components/jobseeker/JProfileEdit.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../../features/jobseekerprofile/jobseekerProfileSlice';

const JProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const { data: profileData } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    profile_img: null,
    phone_number: '',
    date_of_birth: '',
    bio: '',
    place: '',
    linkedin_url: '',
    portfolio_url: '',
    resume: null,
    current_job_title: '',
    job_preferences: '',
    visible_applications: [],
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        phone_number: profileData.phone_number || '',
        date_of_birth: profileData.date_of_birth || '',
        bio: profileData.bio || '',
        place: profileData.place || '',
        linkedin_url: profileData.linkedin_url || '',
        portfolio_url: profileData.portfolio_url || '',
        current_job_title: profileData.current_job_title || '',
        job_preferences: profileData.job_preferences || '',
        visible_applications: profileData.visible_applications || [],
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleVisibleApplicationsChange = (e) => {
    const { checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      visible_applications: checked
        ? [...prevState.visible_applications, value]
        : prevState.visible_applications.filter((app) => app !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => updatedData.append(key, item));
      } else {
        updatedData.append(key, formData[key]);
        setLoading(false);
      }
    }

    // Append the visible_applications as a JSON string
    updatedData.append('visible_applications', JSON.stringify(formData.visible_applications));
    await dispatch(updateProfile(updatedData));
    setLoading(false);
    navigate('/jobseeker/jobseekerprofile');
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label>Profile Image:</label>
            <input type="file" name="profile_img" onChange={handleFileChange} className="border p-2 w-full" />
          </div>
          <div className="col-span-1">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Place:</label>
            <textarea
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>LinkedIn URL:</label>
            <input
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Portfolio URL:</label>
            <input
              type="url"
              name="portfolio_url"
              value={formData.portfolio_url}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Current Job Title:</label>
            <input
              type="text"
              name="current_job_title"
              value={formData.current_job_title}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Job Preferences:</label>
            <textarea
              name="job_preferences"
              value={formData.job_preferences}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          
          
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
          aria-busy={loading}
          >
            {loading ? (
                  <span className="loader animate-spin w-4 h-4 border-2 border-white rounded-full"></span>
                ) : (
            'Save Changes'
          )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JProfileEdit;
