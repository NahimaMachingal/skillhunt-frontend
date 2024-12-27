import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, createOrUpdateAddress } from '../../features/resume/resumeSlice';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.resume);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);
  
  useEffect(() => {
    if (data) {
      setFormData({
        street: data.street || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        postal_code: data.postal_code || '',
        phone: data.phone || '',
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
    form.append('street', formData.street);
    form.append('city', formData.city);
    form.append('state', formData.state);
    form.append('country', formData.country);
    form.append('postal_code', formData.postal_code);
    form.append('phone', formData.phone)
    
    dispatch(createOrUpdateAddress(form)).then(() => navigate('/skill'));
      };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="bg-gray shadow-lg rounded-lg w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-2xl font-bold text-gray-800">Complete Your Address</h1>
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
                    step === 'Address' ? 'text-white bg-green-500 rounded-full px-2 py-1' : 'text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Form */}
            <h2 className="text-xl font-bold text-gray-800 mb-3">Address</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter your street"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="Enter your postal code"
                  className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
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

export default Address;
