import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkill, createOrUpdateSkill } from '../../features/resume/resumeSlice';
import { useNavigate } from 'react-router-dom';

const Skill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.resume);

  const [formData, setFormData] = useState({
    title: '',
    soft_skills: '',
    communication_skills: '',
    other_skills: '',
  });


  useEffect(() => {
      dispatch(fetchSkill());
    }, [dispatch]);

    
  // Set form data based on existing data if available
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || '',
        soft_skills: data.soft_skills || '',
        communication_skills: data.communication_skills || '',
        other_skills: data.other_skills || '',
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
    form.append('title', formData.title);
    form.append('soft_skills', formData.soft_skills);
    form.append('communication_skills', formData.communication_skills);
    form.append('other_skills', formData.other_skills);
    dispatch(createOrUpdateSkill(form)).then(() => navigate('/projects'));
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
                    step === 'Skills' ? 'text-white bg-green-500 rounded-full px-2 py-1' : 'text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Form */}
            <h2 className="text-xl font-bold text-gray-800 mb-3">Skills</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Skill Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your skill title"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Soft Skills</label>
                <textarea
                  name="soft_skills"
                  value={formData.soft_skills}
                  onChange={handleChange}
                  placeholder="Enter your soft skills"
                  className="w-full border rounded-md px-3 py-1 h-24 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Communication Skills</label>
                <textarea
                  name="communication_skills"
                  value={formData.communication_skills}
                  onChange={handleChange}
                  placeholder="Enter your communication skills"
                  className="w-full border rounded-md px-3 py-1 h-24 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Other Skills</label>
                <textarea
                  name="other_skills"
                  value={formData.other_skills}
                  onChange={handleChange}
                  placeholder="Enter other skills"
                  className="w-full border rounded-md px-3 py-1 h-24 focus:outline-none focus:ring focus:ring-blue-200"
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

export default Skill;
