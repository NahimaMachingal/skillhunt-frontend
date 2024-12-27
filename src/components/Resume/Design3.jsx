import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumeData } from "../../features/resume/resumeSlice"; // Assuming a fetchResumeData action is created

const Design3 = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(fetchResumeData()); // Fetch the resume data when the component mounts
  }, [dispatch]);

  
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="flex bg-gray-100 h-screen p-5">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-orange-100 p-6">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
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

          </div>

          {/* Personal Details */}
          <h2 className="mt-4 text-lg font-bold">{data.aboutMe?.full_name || "NIL"}</h2>
          <p>{data.address?.street || "NIL"}</p>
          <p>{data.address?.city || "NIL"}</p>
          <p>{data.address?.postal_code || "NIL"}</p>
          <div className="mt-4">
            {data.socialLinks?.map((link, index) => (
              <p key={index}>{link.platform || "NIL"}</p>
            ))}
          </div>
        </div>

{/* Expertise Section */}
<div className="mt-2">
  <h3 className="font-semibold text-lg border-b-2 border-gray-300 pb-1">EXPERTISE</h3>
  <ul className="mt-2 space-y-4">
    {data.skills?.map((skill, index) => (
      <li key={index}>
        <ul className="list-inside">
          <li> {skill.title || "NIL"}</li>
          <li> {skill.soft_skills || "NIL"}</li>
          <li> {skill.communication_skills || "NIL"}</li>
          <li> {skill.other_skills || "NIL"}</li>
        </ul>
      </li>
    ))}
  </ul>
</div>

        {/* Education Section */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg border-b-2 border-gray-300 pb-1">EDUCATION</h3>
          {data.education?.map((edu, index) => (
            <div key={index} className="mt-2">
              <p>{edu.institution || "NIL"}</p>
              <p>{edu.degree || "NIL"}</p>
              <p>{`${edu.start_date || "NIL"} - ${edu.end_date || "NIL"}`}</p>
              <p>Grade: {edu.grade || "NIL"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-2/3 bg-white p-6">
        <h1 className="text-3xl font-bold border-b-2 border-gray-300 pb-2">
          {data.aboutMe?.full_name || "NIL"}
        </h1>
        <h2 className="text-xl text-gray-600 mt-4">{data.aboutMe?.position || "NIL"}</h2>

        {/* Profile Section */}
        <div className="mt-8">
          <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-1">PROFILE</h3>
          <p className="mt-4">{data.aboutMe?.about || "NIL"}</p>
        </div>

        {/* Experience Section */}
        <div className="mt-8">
          <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-1">EXPERIENCE</h3>
          {data.experience?.map((job, index) => (
            <div key={index} className="mt-4">
              <h4 className="font-bold">{job.job_title || "NIL"}</h4>
              <p className="italic text-gray-700">Company: {job.company_name || "NIL"}</p>
              <p>{`${job.start_date || "NIL"} - ${job.end_date || "Present"}`}</p>
              <p>{job.responsibilities || "NIL"}</p>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <h3 className="font-bold text-lg border-b-2 border-gray-300 pb-1">PROJECTS</h3>
          {data.projects?.map((project, index) => (
            <div key={index} className="mt-4">
              <h4 className="font-bold">Title: {project.title || "NIL"}</h4>
              <p>{project.description || "NIL"}</p>
              <p>{`Start: ${project.start_date || "NIL"} - End: ${
                project.end_date || "Present"
              }`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Design3;
