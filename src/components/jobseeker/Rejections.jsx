import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRejectedJobs } from "../../features/job/jobSlice";

const Rejections = () => {
  const dispatch = useDispatch();
  const { rejectedJobs, status, error } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(fetchRejectedJobs());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Loading rejected jobs...
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-600 mt-10 text-lg">
        Error fetching rejected jobs: {error}
      </p>
    );
  }

  if (rejectedJobs.length === 0 && status !== "rejected") {
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        No rejections found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Better Luck Next Time!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Don’t lose heart! These opportunities might not have worked out, but
          many more are waiting for you.
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Your Rejected Applications
        </h3>
        <div className="space-y-6">
          {rejectedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold text-gray-800">
                {job.job_title || "N/A"}
              </h4>
              <p className="text-gray-600 mt-2">
                <strong>Company:</strong> {job.employer_company_name || "N/A"}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Status:</strong>{" "}
                <span className="text-red-600">Rejected</span>
              </p>
              <p className="text-red-600 mt-4 italic">
                <strong>Reason:</strong> {job.reason || "No reason provided"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rejections;
