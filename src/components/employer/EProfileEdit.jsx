// src/components/jobseeker/JProfileEdit.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../../features/employerprofile/employerProfileSlice';

const EProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profileData } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    profile_img: null,
    phone_number: '',
    date_of_birth: '',
    place: '',
    company_name: '',
    company_website: '',
    company_role: '',
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        phone_number: profileData.phone_number || '',
        date_of_birth: profileData.date_of_birth || '',
        place: profileData.place || '',
        company_name: profileData.company_name || '',
        company_website: profileData.company_website || '',
        company_role: profileData.company_role || '',
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => updatedData.append(key, item));
      } else {
        updatedData.append(key, formData[key]);
      }
    }

    
    await dispatch(updateProfile(updatedData));
    navigate('/employer/employerprofile');
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
            <label>Place:</label>
            <textarea
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Company Name: </label>
            <textarea
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <label>Company_website: </label>
            <input
              type="url"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="col-span-1">
  <label htmlFor="company_role">Company Role:</label>
  <select
    name="company_role"
    value={formData.company_role}
    onChange={handleChange}
    className="border p-2 w-full"
  >
    <option value="admin">Admin</option>
    <option value="manager">Manager</option>
    {/* You can add more options here if needed */}
  </select>
</div>

          
          
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EProfileEdit;
