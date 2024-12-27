import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateReason } from "../../features/job/jobSlice";

const Reason = () => {
  const { applicationId } = useParams();
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateReason({ applicationId, reason })).unwrap();
      toast.success("Reason updated successfully!");
      navigate(-1); // Go back to the previous page
    } catch (error) {
      toast.error("Failed to update reason. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Provide Reason</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 rounded p-3"
          rows="5"
          placeholder="Enter reason here"
          required
        />
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reason;
