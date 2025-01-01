// src/components/Employee/EmployeeSidebar.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedCandidates } from '../../features/job/jobSlice';

const EmployeeSidebar = () => {
  const dispatch = useDispatch();
  const appliedCandidates = useSelector((state) => state.job.appliedCandidates || []);
  console.log("app:",appliedCandidates)
  
  // Extract job_id from the first applied candidate (or any other logic you may need)
  const jobId = appliedCandidates.length > 0 ? appliedCandidates[0].job_id : null;
  useEffect(() => {
   dispatch(fetchAppliedCandidates)
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-500 p-6 shadow-lg min-h-screen">
      <div className="flex text-white text-3xl font-semibold mb-8 text-center">
      <img
            src="/kk.png"
            alt="SkillHunt Logo"
            className="h-12 w-12  rounded-full mr-3 hidden lg:block"
          />
        SkillHunt 
      </div>
      <ul className="space-y-5">
        <li>
          <Link
            to="/postjob"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Post Job
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Posted Jobs
          </Link>
        </li>
        <li>
          <Link
            to="/appliedcandidates"
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Applied Jobs
          </Link>
        </li>
        <li>
          <Link
            to={`/scheduledinterviews`}
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Scheduled Interviews
          </Link>
        </li>
        <li>
          <Link
            to={`/interviewedcandidates`}
            className="block text-white hover:text-gray-300 transition duration-300 rounded-md px-3 py-2 transform hover:scale-105"
          >
            Provide Feedback
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
