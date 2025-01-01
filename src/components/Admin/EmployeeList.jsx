
// src/components/Admin/AdminHome.jsx
// src/components/Admin/AdminHome.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/users/usersApi';
import axios from 'axios';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  // Fetch users on component mount
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Reverse the users array for display
  const reversedUsers = [...users].reverse();

  // Filter users to display only jobseekers
  const employees = reversedUsers.filter((user) => user.user_type === 'employee');

  // Calculate the current users to display based on the current page
  const startIndex = currentPage * usersPerPage;
  const currentUsers = employees.slice(startIndex, startIndex + usersPerPage);

  // Check if there are more users to display for the next page
  const hasMoreUsers = startIndex + usersPerPage < employees.length;

  // Handle "Next" button click
  const handleNext = () => {
    if (hasMoreUsers) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to toggle user status
  const toggleUserStatus = async (userId) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/users/toggle-status/${userId}/`);
      dispatch(fetchUsers()); // Refetch users to update the state
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-cyan-800 mb-6">Admin Dashboard</h1>

      {error && <p className="text-lg text-red-500">{error}</p>}

      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Employers List</h2>
          {hasMoreUsers && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{startIndex + index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.user_type}</td>
                    <td className="py-2 border-b">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`text-red-500 hover:underline ml-4 ${user.is_active ? 'block' : 'unblock'}`}
                      >
                        {user.is_active ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
