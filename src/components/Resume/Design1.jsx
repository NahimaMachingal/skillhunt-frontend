//src/components/Resume/Design1.jsx
// src/components/Resume/Design1.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumeData } from "../../features/resume/resumeSlice"; // Assuming a fetchResumeData action is created

const Design1 = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(fetchResumeData()); // Fetch the resume data when the component mounts
  }, [dispatch]);

  
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.aboutMe) return <div>No data available</div>; // Add fallback here

  return (
    <div className="w-full mx-auto bg-white shadow-lg mt-11">
      {/* Header Section */}
      <div className="flex">
        <div className="w-1/3 bg-blue-200 p-6">
        <img
  src={
    data?.aboutMe.profile_pic
      ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${data.aboutMe.profile_pic}`
      : "https://via.placeholder.com/150"
  }
  alt="Profile"
  className="w-32 h-32 rounded-full mx-auto"
  crossOrigin="anonymous"
/>

          <h2 className="text-center text-xl font-bold mt-4 text-gray-700">
            {data?.aboutMe.full_name || "NIL"}
          </h2>
          <h3 className="text-center text-sm text-gray-500">
            {data?.aboutMe.position || "NIL"}
          </h3>
        </div>
        <div className="w-2/3 bg-gray-50 p-6">
          <h1 className="text-4xl font-bold text-gray-700">
            {data?.aboutMe.full_name || "NIL"}
          </h1>
          <h2 className="text-lg text-gray-500 mt-2">
            {data?.aboutMe.position || "NIL"}
          </h2>
          <p className="text-gray-700 mt-6">{data?.aboutMe.about || "NIL"}</p>
        </div>
      </div>

      {/* Main Sections */}
      <div className="flex h-[calc(70vh-40px)] overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-blue-200 p-6">
          {/* About Me */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
            <p className="text-gray-600 mt-2">{data?.aboutMe.about || "NIL"}</p>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Contact</h3>
            <p className="text-gray-600">{data?.address.phone || "NIL"}</p>
            <p className="text-gray-600">{data?.address.street || "NIL"}</p>
            <p className="text-gray-600">
              {`${data?.address.city || "NIL"}, ${data?.address.state || "NIL"}`}
            </p>
            <p className="text-gray-600">{data?.address.postal_code || "NIL"}</p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
            {data?.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <div key={index} className="justify-between text-gray-600">
                  <span>{skill.title || "NIL"}</span>
                  <p>{skill.soft_skills || "NIL"}</p>
                  <p>{skill.communication_skills || "NIL"}</p>
                  <p>{skill.other_skills || "NIL"}</p>

                </div>
              ))
            ) : (
              <p className="text-gray-600">No skills available</p>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-2/3 bg-gray-50 p-6">
          {/* Projects */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
            {data?.projects.length > 0 ? (
              data.projects.map((project, index) => (
                <div key={index} className="border-b py-2">
                  <h4 className="text-gray-700 font-bold">
                    {project.title || "NIL"}
                  </h4>
                  <p className="text-gray-600">{project.description || "NIL"}</p>
                  <p className="text-gray-600">
                    {`Start: ${project.start_date || "NIL"} - End: ${
                      project.end_date || "Present"
                    }`}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No projects available</p>
            )}
          </div>

          {/* Job Experience */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Job Experience</h3>
            {data?.experience.length > 0 ? (
              data.experience.map((job, index) => (
                <div key={index} className="border-b py-2">
                  <h4 className="text-gray-700 font-bold">
                    {job.job_title || "NIL"}
                  </h4>
                  <p className="text-gray-600">
                    {job.company_name || "NIL"}
                  </p>
                  <p className="text-gray-600">
                    {`${job.start_date || "NIL"} - ${job.end_date || "Present"}`}
                  </p>
                  <p className="text-gray-600">
                    {job.responsibilities || "NIL"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No job experience available</p>
            )}
          </div>


          {/* Education */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Education</h3>
            {data?.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div key={index} className="border-b py-2">
                  <h4 className="text-gray-700 font-bold">
                    {edu.degree || "NIL"} - {edu.institution || "NIL"}
                  </h4>
                  <p className="text-gray-600">
                    {`Start: ${edu.start_date || "NIL"} - End: ${
                      edu.end_date || "Ongoing"
                    }`}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No education records available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design1;
