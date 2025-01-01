import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumeData } from "../../features/resume/resumeSlice"; // Assuming a fetchResumeData action is created

const Design2 = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.resume);

    useEffect(() => {
        dispatch(fetchResumeData()); // Fetch the resume data when the component mounts
    }, [dispatch]);

    
    if (error) return <div>Error: {error}</div>;
    if (!data || !data.aboutMe) return <div>No data available</div>; // Add fallback here

    return (
        <div className="w-full mx-auto bg-white shadow-lg mt-11 flex">
            {/* Left Section */}
            <div className="w-1/3 bg-yellow-500 text-white p-6">
                {/* Profile Picture */}
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


                {/* Name and Position */}
                <h2 className="text-center text-2xl font-bold mb-2">
                    {data?.aboutMe.full_name || "NIL"}
                </h2>
                <h3 className="text-center text-lg mb-6">
                    {data?.aboutMe.position || "NIL"}
                </h3>

                {/* Contact Information */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Contact Me</h4>
                    <p>{data?.address.phone || "NIL"}</p>
                    <p>{data?.address.street || "NIL"}</p>
                    <p>{`${data?.address.city || "NIL"}, ${data?.address.state || "NIL"}`}</p>
                    <p>{data?.address.postal_code || "NIL"}</p>
                </div>

               {/* Skills */}
<div>
    <h4 className="text-lg font-semibold mb-3">Skills</h4>
    {data?.skills.length > 0 ? (
        <ul className="list-disc ml-3 space-y-4">
            {data.skills.map((skill, index) => (
                <div key={index}>
                    <li> {skill.title || "NIL"}</li>
                    <li> {skill.soft_skills || "NIL"}</li>
                    <li> {skill.communication_skills || "NIL"}</li>
                    <li> {skill.other_skills || "NIL"}</li>
                </div>
            ))}
        </ul>
    ) : (
        <p>No skills available</p>
    )}
</div>



            </div>

            {/* Right Section */}
            <div className="w-2/3 p-6">
                {/* About Me */}
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-yellow-500 mb-4">About Me</h3>
                    <p>{data?.aboutMe.about || "NIL"}</p>
                </div>

                {/* Job Experience */}
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-yellow-500 mb-4">Job Experience</h3>
                    {data?.experience.length > 0 ? (
                        data.experience.map((job, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="font-bold text-lg">{job.job_title || "NIL"}</h4>
                                <p className="italic text-gray-700">{job.company_name || "NIL"} </p>
                                <p>{`${job.start_date || "NIL"} - ${job.end_date || "Present"}`}</p>
                                <p>{job.responsibilities || "NIL"}</p>
                            </div>
                        ))
                    ) : (
                        <p>No job experience available</p>
                    )}
                </div>

                {/* Projects */}
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-yellow-500 mb-4">Projects</h3>
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
                        <p>No projects available</p>
                    )}
                </div>

                {/* Education */}
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-yellow-500 mb-4">Education</h3>
                    {data?.education.length > 0 ? (
                        data.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-bold text-gray-700">{edu.institution || "NIL"}</p>
                                <p>Degree: {edu.degree || "NIL"}</p>
                                <p>{`${edu.start_date || "NIL"} - ${edu.end_date || "NIL"}`}</p>
                                <p>Grade: {edu.grade || "NIL"}</p>
                            </div>
                        ))
                    ) : (
                        <p>No education records available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Design2;
