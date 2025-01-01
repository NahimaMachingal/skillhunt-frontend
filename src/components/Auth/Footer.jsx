import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-gray-100 py-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          {/* Logo Section */}
          <div className="flex items-center mb-8 md:mb-0">
          <img
              src="/kk.png"
              alt="SkillHunt Logo"
              className="h-14 w-14 rounded-full mr-2"
            />
            <span className="ml-3 text-xl font-bold text-gray-700">SkillHunt</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-between gap-8 w-full md:w-auto">
            <div className="flex flex-col text-sm space-y-2">
              <a href="#" className="hover:text-white">Find Jobs</a>
              <a href="#" className="hover:text-white">Post Jobs</a>
              <a href="#" className="hover:text-white">Companies</a>
              <a href="#" className="hover:text-white">Categories</a>
            </div>
            <div className="flex flex-col text-sm space-y-2">
              <a href="#" className="hover:text-white">How It Works</a>
              <a href="#" className="hover:text-white">Pricing Plans</a>
              <a href="#" className="hover:text-white">Testimonials</a>
            </div>
            <div className="flex flex-col text-sm space-y-2">
              <a href="#" className="hover:text-white">FAQs</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>

          {/* Social Media and Copy Section */}
          <div className="flex flex-col items-center md:items-end mt-8 md:mt-0">
            <p className="text-gray-800 text-sm mb-4">
              © 2024 Skillhunt. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c5.524 0 10 4.476 10 10s-4.476 10-10 10-10-4.476-10-10 4.476-10 10-10zm0 18.667c4.785 0 8.667-3.882 8.667-8.667s-3.882-8.667-8.667-8.667-8.667 3.882-8.667 8.667 3.882 8.667 8.667 8.667zm3.741-12.356l-4.175 4.3-1.534-1.503-1.266 1.266 2.8 2.747 5.441-5.554-1.266-1.256z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c5.524 0 10 4.476 10 10s-4.476 10-10 10-10-4.476-10-10 4.476-10 10-10zm0 18.667c4.785 0 8.667-3.882 8.667-8.667s-3.882-8.667-8.667-8.667-8.667 3.882-8.667 8.667 3.882 8.667 8.667 8.667zm3.741-12.356l-4.175 4.3-1.534-1.503-1.266 1.266 2.8 2.747 5.441-5.554-1.266-1.256z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      
    </footer>
  );
};

export default Footer;
