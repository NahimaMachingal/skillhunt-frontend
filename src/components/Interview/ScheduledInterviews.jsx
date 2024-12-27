// src/components/interview/ScheduledInterviews.jsx
import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerScheduledInterviews } from "../../features/interview/interviewSlice";
import { updateInterviewStatus } from "../../features/interview/interviewSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ScheduledInterviews = () => {
  const dispatch = useDispatch();
  const { interviews, status, error } = useSelector((state) => state.interview);
  console.log("hhhh",interviews)
  const [uniqueJobTitles, setUniqueJobTitles] = useState([]);

  useEffect(() => {
    dispatch(fetchEmployerScheduledInterviews());
  }, [dispatch]);

  const handleStatusChange = (interviewId, newStatus) => {
          dispatch(updateInterviewStatus({ interviewId, newStatus }))
          .then(() => toast.success('Interview status updated successfully!'))
              .catch(() => toast.error('Failed to update interview status.'));
      };

  useEffect(() => {
  const filteredInterviews = interviews.filter((interview) => {
    // Exclude interviews where both location and meeting_link are null
    return !(interview.location === null && interview.meeting_link === null);
  });
  setUniqueJobTitles(filteredInterviews);
}, [interviews]);

  

  if (status === 'failed') {
    return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Scheduled Interviews</h2>
      {uniqueJobTitles.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg p-6 bg-white">
          <table className="min-w-full bg-white table-auto border-collapse">
            <thead>
            <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Applicant Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Job Title</th>
                <th className="py-3 px-6 text-left">Scheduled Date</th>
                <th className="py-3 px-6 text-left">Mode</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Meeting Link</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {uniqueJobTitles.map((interview) => (
                <tr key={interview.id} className="border-b border-gray-200 hover:bg-blue-50 transition duration-200 ease-in-out rounded-lg shadow-md mb-4">
                  <td className="py-3 px-6">{interview.applicant_name}</td>
                  <td className="py-3 px-6">{interview.applicant_email}</td>
                  <td className="py-3 px-6">{interview.job_title}</td>
                  <td className="py-3 px-6">{new Date(interview.scheduled_date).toLocaleString()}</td>
                  <td className="py-3 px-6">{interview.mode}</td>
                  <td className="py-3 px-6">{interview.location}</td>
                  <td className="py-3 px-6">
  {interview.meeting_link ? (
    <a href={interview.meeting_link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
      {interview.meeting_link}
    </a>
  ) : (
    'N/A'
  )}
</td>
<p className="text-gray-700 mb-4">
                            <br></br>
                            <select
                                value={interview.status}
                                onChange={(e) => handleStatusChange(interview.id, e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition"
                                >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </p>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No interviews scheduled.</p>
      )}
    </div>
  );
};

export default ScheduledInterviews;
