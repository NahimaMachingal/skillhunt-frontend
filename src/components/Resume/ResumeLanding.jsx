import React from 'react';
import { Link } from 'react-router-dom';

const ResumeLanding = () => {
  return (
    <div className="bg-gray-50 flex justify-center items-center p-8">
      <main className="flex flex-col lg:flex-row items-start lg:space-x-16 lg:px-20 w-full max-w-screen-xl">
        {/* Left Text Section */}
        <div className="lg:max-w-lg text-left">
          <p className="text-gray-500 text-sm mb-2">24,485 resumes created today</p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Only 2% of resumes make it past the first round. Be in the top 2%
          </h2>
          <p className="text-gray-600 mb-6">
            Use professional field-tested resume templates that follow the exact 
            <br></br>
            'resume rules'
            employers look for. 
            <br></br>
            Easy to use and done within minutes – try now for free!
          </p>
          <br></br>
          <div className="space-x-4 mb-4">
           
            <Link
              to="/aboutme"
              className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"
            >
              Create Resume
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm">
            Use professional templates and export your resume to PDF, DOCX, or TXT.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="mt-12 lg:mt-0 flex justify-end items-end">
          <img
            src="resume.png"
            alt="Resume preview"
            className="shadow-lg border border-gray-200 rounded-lg w-[680px]"
          />
        </div>
      </main>
    </div>
  );
};

export default ResumeLanding;

