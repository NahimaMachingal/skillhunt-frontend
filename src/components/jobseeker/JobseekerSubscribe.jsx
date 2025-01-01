import React from "react";
import { useNavigate } from "react-router-dom";


const JobseekerSubscribe = () => {
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate("/subscriptionform"); // Replace with the correct route for SubscriptionForm
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-blue-50 to-green-50 shadow-lg rounded-xl border border-gray-300">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Jobseeker Subscription
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
        Unlock all the premium features to enhance your job search and land your dream job!
      </p>
      <ul className="space-y-4 mb-8">
        <li className="flex items-center text-lg text-gray-700">
          <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
            ✓
          </span>
          <span>Unlimited Messaging</span>
        </li>
        <li className="flex items-center text-lg text-gray-700">
          <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
            ✓
          </span>
          <span>Unlimited Job Applications</span>
        </li>
        <li className="flex items-center text-lg text-gray-700">
          <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
            ✓
          </span>
          <span>Resume Building Options</span>
        </li>
        <li className="flex items-center text-lg text-gray-700">
          <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
            ✓
          </span>
          <span>Detailed Job Descriptions</span>
        </li>
      </ul>
      <div className="text-center mb-6">
        
      </div>
      <div className="text-center">
        <button
          onClick={handleSubscribeClick}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default JobseekerSubscribe;
