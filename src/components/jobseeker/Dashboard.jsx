import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppliedJobs } from '../../features/job/jobSlice';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { appliedJobs, status, error } = useSelector((state) => state.job);
    console.log("hsdjfjhjf:",appliedJobs)
    
    useEffect(() => {
        dispatch(fetchUserAppliedJobs());
    }, [dispatch]);

    

    if (status === 'failed') {
        return <p className="text-center text-red-600 mt-10 text-lg">Error: {error}</p>;
    }

    if (appliedJobs.length === 0 && status === 'succeeded') {
        return <p className="text-center text-gray-600 mt-10 text-lg">You have not applied to any jobs yet.</p>;
    }
    
    // Calculate total applied jobs and interviews
    const totalJobsApplied = appliedJobs.length;
    const totalInterviewed = appliedJobs.filter(job => job.status === 'interviewed').length;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
           <div className="p-6 bg-white flex justify-center mb-6">
                <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-1/3 mx-2">
                    <h3 className="text-lg">Total Jobs Applied</h3>
                    <p className="text-2xl font-bold">{totalJobsApplied}</p>
                </div>
                <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-1/3 mx-2">
                    <h3 className="text-lg">Interviewed</h3>
                    <p className="text-2xl font-bold">{totalInterviewed}</p>
                </div>
            </div>

            <div className="p-6 bg-white flex justify-center mb-6">
                <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-1/3 mx-2">
                <Link to="/jobseeker/feedbacks" className="text-white underline">
  View Feedbacks
</Link>
                    
                </div>
                <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-1/3 mx-2">
  <Link to="/jobseeker/rejections" className="text-white underline">
    Rejected
  </Link>
</div>

            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-white lg:rounded-r-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Applied Jobs</h2>
                <div className="space-y-6">
                    {appliedJobs.map((job) => (
                        
                        <div
                            key={job.id}
                            className="max-w-4xl w-full p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out mx-auto flex items-center justify-between"
                        >
                            <div>
                                {/* Use Link for clickable job title */}
                                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                                    {job.job_title || 'N/A'}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {job.employer_company_name || 'N/A'}
                                </p>
                                <p className="text-gray-600 text-sm mt-1">
                                    {job.is_active || 'N/A'}
                                </p>
                                
                                
                            </div>
                            <div className="p-2 bg-yellow-100 border-l-4 border-yellow-400 rounded-lg shadow-md">
    <p className="text-gray-700 text-lg font-semibold">
        Status: <span className="text-yellow-700">{job.is_active ? job.status : 'Job deleted by Employer'}</span>
    </p>
    {job.status === "Interview" && job.is_active && (
    <Link
        to={`/interview-details/${job.job_id}`}
        className="text-blue-600 text-sm underline hover:text-blue-800 cursor-pointer"
    >
        Details
    </Link>
)}
</div>


                            
                            <Link 
  to={job.id ? `/jobseeker/job/${job.job_id}` : '#'}  // Prevent navigation if the job is not found
  className={`${
    job.id ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
  } text-white py-2 px-5 rounded-md transition transform hover:scale-105 shadow-md`}
>
  {job.id ? 'Read More' : 'Job Deleted by Company'}
</Link>
                            
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

