import React from "react";
import { Link } from "react-router-dom";

const MainHome = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Full-width Image with Overlay Text */}
      <div className="relative w-full">
        <img
          src="emphome.jpg" // Ensure the path to the image is correct
          alt="Home"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Optional Overlay Text (if needed) */}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-10">
        <h1 className="text-4xl font-bold bg-blue-300 bg-opacity-40 px-6 py-4 rounded-md shadow-md mx-auto text-center w-fit">
          Unlock Your Career Potential with Our Key Features!
        </h1>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {/* Feature Cards */}
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-blue-500 text-3xl mb-4">
              <i className="fas fa-file-alt"></i>
            </div>
            <Link to="/resumelanding" className="text-lg font-bold text-gray-700">
              Resume Creation
            </Link>
            <p className="text-gray-600 mt-2">
              Craft a standout resume in minutes with our easy-to-use tools.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-green-500 text-3xl mb-4">
              <i className="fas fa-robot"></i>
            </div>
            <Link to="/jobseeker/chatbot" className="text-lg font-bold text-gray-700">
              AI Assist
            </Link>
            <p className="text-gray-600 mt-2">
              Leverage AI to get tailored content recommendations and insights.
            </p>
          </div>

          <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-red-500 text-3xl mb-4">
              <i className="fas fa-briefcase"></i>
            </div>
            <Link to="/home" className="text-lg font-bold text-gray-700">
              Job Opportunities
            </Link>
            <p className="text-gray-600 mt-2">
              Discover job openings that match your skills and career aspirations.
            </p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="text-yellow-500 text-3xl mb-4">
              <i className="fas fa-handshake"></i>
            </div>
            <Link to="/chat" className="text-lg font-bold text-gray-700">
              Connect with Employers
            </Link>
            <p className="text-gray-600 mt-2">
              Engage with top employers and explore opportunities tailored to your expertise and goals.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {[
            "Banking",
            "Work From Home",
            "HR",
            "Sales",
            "Accounting",
            "IT",
            "Customer Support",
            "Event Management",
            "SQL",
            "Graphic Design",
            "Oracle",
            "Digital Marketing",
          ].map((category, index) => (
            <span
              key={index}
              className={`bg-${[
                "purple",
                "red",
                "green",
                "orange",
                "blue",
                "gray",
                "pink",
                "teal",
              ][index % 8]}-500 text-white text-center py-2 rounded-lg shadow font-semibold`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
    
  );
};

export default MainHome;
