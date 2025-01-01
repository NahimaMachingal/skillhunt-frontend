// src/components/Auth/EHome.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EHome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {/* Background Image Section */}
      <div
        className="h-96 w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/emphome.jpg')",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content Section */}
      <div className="bg-white py-10">
        {/* Title Section */}
        <h1 className="text-4xl font-bold bg-blue-300 bg-opacity-40 px-6 py-4 rounded-md shadow-md mx-auto text-center w-fit">
          Unlock Your Career Potential with Our Key Features!
        </h1>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg">
            <div className="text-blue-500 text-3xl mb-4">
              <i className="fas fa-file-alt"></i>
            </div>
            <Link to="/postjob" className="text-lg font-bold text-gray-700">
              Post Jobs
            </Link>
            <p className="text-gray-600 mt-2">
            Simplify recruitment by posting job openings and finding the right candidates efficiently.
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg">
            <div className="text-green-500 text-3xl mb-4">
              <i className="fas fa-robot"></i>
            </div>
            <Link to="/employer/chatbot" className="text-lg font-bold text-gray-700">
              AI Assist
            </Link>
            <p className="text-gray-600 mt-2">
              Leverage AI to get tailored content recommendations and insights.
            </p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-lg">
            <div className="text-red-500 text-3xl mb-4">
              <i className="fas fa-briefcase"></i>
            </div>
            <Link to="/employerchat" className="text-lg font-bold text-gray-700">
            Connect with Candidates
            </Link>
            <p className="text-gray-600 mt-2">
            Build professional connections and find the perfect fit for your job openings with ease.
            </p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { color: "bg-purple-500", label: "Banking" },
              { color: "bg-red-500", label: "Work From Home" },
              { color: "bg-green-500", label: "HR" },
              { color: "bg-orange-500", label: "Sales" },
              { color: "bg-blue-500", label: "Accounting" },
              { color: "bg-gray-800", label: "IT" },
              { color: "bg-pink-500", label: "Customer Support" },
              { color: "bg-purple-500", label: "Event Management" },
              { color: "bg-blue-500", label: "SQL" },
              { color: "bg-orange-500", label: "Graphic Design" },
              { color: "bg-teal-500", label: "Oracle" },
              { color: "bg-green-500", label: "Digital Marketing" },
            ].map((category, index) => (
              <span
                key={index}
                className={`${category.color} text-white text-center py-2 rounded-lg shadow font-semibold`}
              >
                {category.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EHome;

