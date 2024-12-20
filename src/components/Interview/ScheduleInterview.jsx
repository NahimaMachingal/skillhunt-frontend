// src/components/Interview/ScheduleInterview.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { scheduleInterview } from "../../features/interview/interviewSlice";



const ScheduleInterview = () => {
  const { applicantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("appllicant:",applicantId)

  // Get job_id and job_title from query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const job_id = queryParams.get('job_id');
  const job_title = queryParams.get('job_title');
  const applicant_name = queryParams.get("applicant_name");
  const applicant_email = queryParams.get("applicant_email");

  const [formData, setFormData] = useState({
    job: job_id || "",  // Set job_id dynamically if available
    job_title: job_title || "",
    applicant_name: applicant_name || "",
    applicant_email: applicant_email || "",
    scheduled_date: "",
    mode: "",
    location: "",
    meeting_link: "",
    status: "Scheduled",
  });
  // Update job and job_title in form data dynamically when query params change
  useEffect(() => {
    if (job_id && job_title) {
      setFormData((prevState) => ({
        ...prevState,
        job: job_id,
        job_title,
        applicant_name,
      applicant_email,
      }));
    }
  }, [job_id, job_title]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(scheduleInterview(formData)).unwrap();
      navigate(-1); // Navigate back to applicants list
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Schedule Interview</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
          <input
            type="text"
            name="applicant_name"
            value={formData.applicant_name}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Applicant Email</label>
          <input
            type="email"
            name="applicant_email"
            value={formData.applicant_email}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>
        
      <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
          <input
            type="datetime-local"
            name="scheduled_date"
            value={formData.scheduled_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mode</label>
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Mode</option>
            <option value="In-person">In-person</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>
        {formData.mode === "In-person" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}
        {formData.mode === "Virtual" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
            <input
              type="text"
              name="meeting_link"
              value={formData.meeting_link}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterview;
