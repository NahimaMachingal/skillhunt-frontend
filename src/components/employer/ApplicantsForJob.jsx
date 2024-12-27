//src/components/employer/ApplicatsForJob.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchApplicantsForJob, updateApplicationStatus } from "../../features/job/jobSlice";
import { Link } from "react-router-dom";

const ApplicantsForJob = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.job.applicantsForJob || []);
  console.log("apppllliccants::",applicants)
  const loading = useSelector((state) => state.job.loading);
  const error = useSelector((state) => state.job.error);
  

  useEffect(() => {
    dispatch(fetchApplicantsForJob(jobId));
  }, [dispatch, jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    console.log("Changing status to:", newStatus, "for application:", applicationId); // Debugging log
    try {
      await dispatch(updateApplicationStatus({ applicationId, status: newStatus })).unwrap();
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error); // Debugging log
      toast.error("Failed to update status. Please try again.");
    }
  };
  

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Applied Candidates</h2>
      {applicants.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Applicant Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Experience</th>
                <th className="py-3 px-6 text-left">Arabic</th>
                <th className="py-3 px-6 text-left">Resume</th>
                <th className="py-3 px-6 text-left">Cover Letter</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b border-gray-200 hover:bg-blue-50 transition duration-200 ease-in-out">
                  <td className="py-3 px-6">{applicant.applicant_name}</td>
                  <td className="py-3 px-6">{applicant.applicant_email}</td>
                  <td className="py-3 px-6">{applicant.questions?.experience || "N/A"}</td>
                  <td className="py-3 px-6">{applicant.questions?.arabic || "N/A"}</td>
                  <td className="py-3 px-6">
                    <a
                      href={`${import.meta.env.VITE_API_URL.replace('/api', '')}${applicant.resume}`}
                      className="text-blue-500 hover:text-blue-700 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Resume
                    </a>
                  </td>
                  <td className="py-3 px-6">{applicant.cover_letter || "No cover letter provided"}</td>
                  <td className="py-3 px-6">
                                        <select
                                            value={applicant.status}
                                            onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1"
                                            
                                        >
                                            {applicant.status !== "Reviewed" && applicant.status !== "Interview" && applicant.status !== "Accepted"  && (
                        <option value="Pending" disabled={applicant.status === "Rejected"}>
                          Pending
                        </option>
                      )}
                                            {applicant.status !== "Interview" && applicant.status !== "Accepted" && (
                                            <option value="Reviewed" disabled={applicant.status === "Rejected"}>Reviewed</option> )}
                                            <option value="Interview" disabled={applicant.status === "Rejected"}>Interview</option>
                                            
                                            {applicant.status !== "Interview"  && (
                                            <option value="Accepted" disabled={applicant.status === "Rejected"}>Accepted</option>)}
                                            <option value="Rejected" disabled={applicant.status === "Rejected"}>Rejected</option>
                                        </select>
                                        <div className="mt-2">
                                        {applicant.status === "Interview" && (
                                           <Link
                                            to={`/schedule/${applicant.id}?job_id=${applicant.job_id}&job_title=${applicant.job_title}&applicant_name=${encodeURIComponent(applicant.applicant_name)}&applicant_email=${encodeURIComponent(applicant.applicant_email)}`} className="text-blue-500 hover:text-blue-700 underline" > Schedule 
                                            </Link> 
                                          )}


{applicant.status === "Rejected" && (
                        <Link
                          to={`/reason/${applicant.id}`}
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          Reason
                        </Link>
                      )}
                                          </div>
                                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No applicants for this job.</p>
      )}
    </div>
  );
};

export default ApplicantsForJob;
