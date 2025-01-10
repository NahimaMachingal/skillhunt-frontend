import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4M7 12l-2 2 2-2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">
          Subscription Successful!
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          🎉 Congratulations! You now have access to all premium features.
        </p>
        <button
          className="mt-8 w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          onClick={() =>  navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

