// src/components/employer/EmployerProfile.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../features/employerprofile/employerProfileSlice';
import { useNavigate } from 'react-router-dom';

// Default profile image placeholder
const defaultProfileImg = '/profile.jpg';

const EmployerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.profile);

  const handleEditClick = () =>{
    // Navigate to the ProfileEdit page when the button is clicked
    navigate('/employer/eprofileedit');
  }

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


  if (status === 'failed') {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  // Helper function to display "Not defined" if the field is not available
  const displayField = (field) => field || 'Not defined';

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Profile Picture and Basic Info */}
        <div className="text-center md:border-r md:pr-4">
          <img
            src={data?.profile_img ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${data.profile_img}` : defaultProfileImg}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{displayField(data?.user?.username || 'John Doe')}</h2>
          <p className="text-gray-600 mb-4">{displayField(data?.current_job_title || 'Jobseeker')}</p>
          <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2">Follow</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-full">Message</button>
        </div>
        </div>

        {/* Middle Section - Contact Information */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <p><strong>Email: </strong> {displayField(data?.user?.email)}</p>
          <p><strong>Phone Number: </strong> {displayField(data?.phone_number)}</p>
          <p><strong>Date of Birth: </strong> {displayField(data?.date_of_birth)}</p>
          <p><strong>Place: </strong> {displayField(data?.place)}</p>
          
          <button  onClick={handleEditClick} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full">Edit</button>
        </div>

        {/* Right Section - Social Links and Bio */}
        <div className="col-span-1 p-4">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <p><strong>Company: </strong> <a href={data?.company_name || '#'} target="_blank" className="text-blue-600">{displayField(data?.company_name)}</a></p>
          <p><strong>Company_website: </strong> <a href={data?.company_website || '#'} target="_blank" className="text-blue-600">{displayField(data?.company_website)}</a></p>
          <p><strong>Company Role: </strong> {data?.company_role ? displayField(data.company_role) : 'N/A'}</p>
          
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
