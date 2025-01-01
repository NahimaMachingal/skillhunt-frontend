import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchEducation, createOrUpdateEducation} from '../../features/resume/resumeSlice';
import { useNavigate } from 'react-router-dom';

const Education = () => {
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const { data, loading, error } = useSelector((state) => state.resume);

    const [formData, setFormData] = useState({
        degree: '',
        institution: '',
        start_date: '',
        end_date: '',
        grade:'',
    });

    useEffect(() => {
        dispatch(fetchEducation());
      }, [dispatch]);

    // Set form data based on existing data if available
      React.useEffect(() => {
        if (data) {
          setFormData({
            degree: data.degree || '',
            institution: data.institution ||'',
            start_date: data.start_date ||'',
            end_date: data.end_date ||'',
            grade: data.grade || '',
          });
        }
      }, [data]);

    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: files ? files[0] : value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('degree', formData.degree);
        form.append('institution', formData.institution);
        form.append('start_date', formData.start_date);
        form.append('end_date', formData.end_date);
        form.append('grade', formData.grade);
        dispatch(createOrUpdateEducation(form)).then(() => navigate('/experience'));
    };

    
    
      if (error) {
        return <div>Error: {error}</div>;
      }

    return (
        <div className="flex justify-center items-center bg-white">
      <div className="bg-gray shadow-lg rounded-lg w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-2xl font-bold text-gray-800">Complete Your Profile</h1>
          <p className="text-sm text-gray-500">Unlock 500+ Jobs From Top Companies</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Text Section */}
          <div className="bg-white p-4 lg:w-1/3 border-r">
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 font-semibold">✔</span>
                <p className="text-gray-600 text-sm">Take 4 Steps</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 font-semibold">✔</span>
                <p className="text-gray-600 text-sm">Direct Call From HR</p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 font-semibold">✔</span>
                <p className="text-gray-600 text-sm">Connect With Top Companies</p>
              </li>
            </ul>
          </div>

          {/* Right Form Section */}
          <div className="p-8 flex-1 bg-green-100">
            {/* Progress Steps */}
            <div className="flex justify-between mb-4">
              {['About Me', 'Address', 'Skills', 'Projects', 'Education', 'Experience'].map((step, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center text-sm font-semibold ${
                    step === 'Education' ? 'text-white bg-green-500 rounded-full px-2 py-1' : 'text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Form */}
            <h2 className="text-xl font-bold text-gray-800 mb-3">Education </h2>
            
            <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Degree</label>
                <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="Degree"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Institution</label>
                <textarea
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Institution"
                    className="w-full border rounded-md px-3 py-1 h-24 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              
              <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                
                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
               
                <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>
                  <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Grade</label>
                <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="Grade"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
                </div>
                  
                  <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </form>
        </div>
        </div>
        </div>
        </div>
    );
};

export default Education;
