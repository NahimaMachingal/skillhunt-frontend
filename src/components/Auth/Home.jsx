// src/components/Auth/Home.js
// src/components/Auth/Home.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchApprovedJobs } from '../../features/job/jobSlice';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const approvedJobs = useSelector((state) => state.job.approvedJobs);
    const navigate = useNavigate();

    // States for filters and search
    const [employmentType, setEmploymentType] = useState('All');
    const [experienceLevel, setExperienceLevel] = useState('All');
    const [salaryRange, setSalaryRange] = useState('All');
    const [isRemote, setIsRemote] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    // States for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    useEffect(() => {
        dispatch(fetchApprovedJobs());
    }, [dispatch]);

    const handleDetailsClick = (jobId) => {
        navigate(`/jobseeker/job/${jobId}`);
    };

    // Filter logic
    const filteredJobs = approvedJobs.filter((job) => {
        const matchesActive = job.is_active; // Ensure the job is active
        const matchesEmploymentType =
            employmentType === 'All' || job.employment_type === employmentType;
        const matchesExperienceLevel =
            experienceLevel === 'All' || job.experience_level === experienceLevel;
        const matchesSalaryRange =
            salaryRange === 'All' ||
            (salaryRange === '0-1000' && job.salary_min <= 1000) ||
            (salaryRange === '1000-3000' && job.salary_min > 1000 && job.salary_min <= 3000) ||
            (salaryRange === '3000-5000' && job.salary_min > 3000 && job.salary_min <= 5000) ||
            (salaryRange === '5000-10000' && job.salary_min > 5000 && job.salary_min <= 10000) ||
            (salaryRange === '10000+' && job.salary_min > 10000);
        const matchesRemote = !isRemote || job.is_remote;
        const matchesKeyword =
            !searchKeyword || job.title.toLowerCase().includes(searchKeyword.toLowerCase()) || job.employer_company_name.toLowerCase().includes(searchKeyword.toLowerCase());
            
        const matchesLocation =
            !searchLocation || job.location.toLowerCase().includes(searchLocation.toLowerCase());
        return (
            matchesActive &&
            matchesEmploymentType &&
            matchesExperienceLevel &&
            matchesSalaryRange &&
            matchesRemote &&
            matchesKeyword &&
            matchesLocation
        );
    });
     // Pagination Logic
     const indexOfLastJob = currentPage * jobsPerPage;
     const indexOfFirstJob = indexOfLastJob - jobsPerPage;
     const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
 
     // Change page
     const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
     // Calculate total pages
     const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
 

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 p-6">
            {/* Search Bar */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-grow">
                        <label htmlFor="searchKeyword" className="block text-gray-700 font-semibold mb-2">
                            Search Jobs
                        </label>
                        <input
                            type="text"
                            id="searchKeyword"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Enter job title, keyword, or company"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="searchLocation" className="block text-gray-700 font-semibold mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="searchLocation"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            placeholder="Enter location"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
                    <h2 className="text-xl font-bold mb-6 text-blue-700">Filters</h2>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Employment Type</label>
                        <select
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        >
                            <option>All</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Temporary</option>
                            <option>Internship</option>
                            <option>Freelance</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Experience Level</label>
                        <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        >
                            <option>All</option>
                            <option>Entry level</option>
                            <option>Mid level</option>
                            <option>Senior level</option>
                            <option>Executive</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Salary Range</label>
                        <select
                            value={salaryRange}
                            onChange={(e) => setSalaryRange(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        >
                            <option>All</option>
                            <option value="0-1000">0-1000</option>
                            <option value="1000-3000">1000-3000</option>
                            <option value="3000-5000">3000-5000</option>
                            <option value="5000-10000">5000-10000</option>
                            <option value="10000+">10000+</option>
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center text-gray-700 font-medium">
                            <input
                                type="checkbox"
                                checked={isRemote}
                                onChange={(e) => setIsRemote(e.target.checked)}
                                className="mr-2"
                            />
                            Remote Jobs
                        </label>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Recommended Jobs</h1>
                        <p className="text-lg font-medium text-gray-600">({currentJobs.length} results found)</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                                <p className="text-gray-600 mb-4">{job.employer_company_name}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {job.employment_type}
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {job.location}
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    <strong>Posted:</strong> {new Date(job.posted_at).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <strong>Salary:</strong> {job.currency} {job.salary_max ? `${job.salary_min}/hr` : 'Not specified' } 
                                </p>
                                <button
                                    onClick={() => handleDetailsClick(job.id)}
                                    className="text-blue-600 font-medium hover:text-blue-800"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                        {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg mr-2 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 ' : 'bg-blue-600 text-white'}`}
    >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg ml-2 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 ' : 'bg-blue-600 text-white'}`}
    >
                            Next
                        </button>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Home;
