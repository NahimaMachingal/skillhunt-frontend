//src/components/Admin/UserVerification.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserVerification = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);


    // Access the token from the Redux store
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchUnverifiedUsers = async () => {
      try {
        if (!accessToken) return;
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/unverified-users/`, {

          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the headers
          },
          
        });
        setUnverifiedUsers(response.data);
      } catch (error) {
        console.error('Error fetching unverified users:', error);
      }
    };

    fetchUnverifiedUsers(); // Call the fetch function
  }, [accessToken]); // Run only once when the component mounts

  const handleVerify = async (userId) => {
    try {
      if (!accessToken) return;
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/verify-user/${userId}/`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the token in the headers
        },
      });
      setUnverifiedUsers(unverifiedUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Unverified Users</h2>
      <ul className="space-y-4">
        {unverifiedUsers.map((user) => (
          <li key={user.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-200 ease-in-out">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">{user.username}</span> {/* User Name */}
              <span className="text-sm text-gray-600">{user.user_type}</span> {/* User Type */}
              <span className="text-sm text-gray-500">{user.email}</span> {/* User Email */}
            </div>
            <button
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out"
              onClick={() => handleVerify(user.id)}
            >
              Verify
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserVerification;
