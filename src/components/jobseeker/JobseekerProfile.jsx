// src/components/jobseeker/JobseekerProfile.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../features/jobseekerprofile/jobseekerProfileSlice';
import { useNavigate } from 'react-router-dom';

// Default profile image placeholder
const defaultProfileImg = '/sp.webp';

const JobseekerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false); // State to track follow status
  const { data, status, error } = useSelector((state) => state.profile);
  console.log(data,"data");

  const handleEditClick = () =>{
    // Navigate to the ProfileEdit page when the button is clicked
    navigate('/jobseeker/jprofileedit');
  }

  const handleFollowClick = () => {
    // Toggle the follow state
    setIsFollowed(!isFollowed);
  };

  const handleMessage = () => {
    navigate('/chat')
  };

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
      <div className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Section - Profile Picture and Basic Info */}
        <div className="col-span-1 text-center border-b sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r">
          <img
            src={data?.profile_img ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${data.profile_img}` : defaultProfileImg}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{displayField(data?.user?.username || 'John Doe')}</h2>
          <p className="text-gray-600 mb-4">{displayField(data?.current_job_title || 'Jobseeker')}</p>
          <button
            onClick={handleFollowClick}
            className={`px-4 py-2 rounded-full mr-2 ${isFollowed ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
          >
            {isFollowed ? 'Followed' : 'Follow'}
          </button>
          <button 
          onClick={handleMessage}
          className="bg-gray-500 text-white px-4 py-2 rounded-full">Message</button>
        </div>

        {/* Middle Section - Contact Information */}
        <div className="col-span-1 p-4">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <p><strong>Email: </strong> {displayField(data?.user?.email)}</p>
          <p><strong>Phone Number: </strong> {displayField(data?.phone_number)}</p>
          <p><strong>Date of Birth: </strong> {displayField(data?.date_of_birth)}</p>
          <p><strong>Place: </strong> {displayField(data?.place)}</p>
          
          <button onClick={handleEditClick} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full">Edit</button>
        </div>

        {/* Right Section - Social Links and Bio */}
        <div className="col-span-1 p-4">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <p><strong>LinkedIn: </strong> <a href={data?.linkedin_url || '#'} target="_blank" className="text-blue-600">{displayField(data?.linkedin_url)}</a></p>
          <p><strong>Portfolio: </strong> <a href={data?.portfolio_url || '#'} target="_blank" className="text-blue-600">{displayField(data?.portfolio_url)}</a></p>
          <p className="mt-4"><strong>Bio: </strong> {displayField(data?.bio)}</p>
          <p className="mt-4"><strong>Job Preferences: </strong> {displayField(data?.job_preferences)}</p>
        </div>
      </div>
    </div>
  );
};

export default JobseekerProfile;
