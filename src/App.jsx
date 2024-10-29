import { BrowserRouter as Router,Routes,Route } from "react-router-dom"

import './tailwind.css'
import React from 'react';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from "./components/Auth/Landing";
import Layout from "./components/Auth/Layout";
import ELayout from "./components/Auth/ELayout";
// Admin Components
import AdminHome from './components/Admin/AdminHome';
import AdminLayout from './components/Admin/AdminLayout'; // Import the AdminLayout
import EmployeeList from "./components/Admin/EmployeeList";
import JobseekerProfile from "./components/jobseeker/JobseekerProfile";
import JProfileEdit from "./components/jobseeker/JProfileEdit";
import EHome from "./components/Auth/EHome";
import EmployerProfile from "./components/Employer/EmployerProfile";
import EProfileEdit from "./components/Employer/EProfileEdit";
import PostJob from "./components/employer/PostJob";
import Jobs from "./components/employer/Jobs";
import PendingJobs from "./components/Admin/PendingJobs";
import JobDetail from "./components/Admin/JobDetail";
import JobSeekerJobDetail from "./components/jobseeker/JobseekerJobDetail";
import JobApplicationForm from "./components/jobseeker/JobApplicationForm";
import AdminJobList from "./components/Admin/AdminJobList";
import AppliedCandidates from "./components/employer/AppliedCandidates";
import AdminAppliedJobs from "./components/Admin/AdminAppliedJobs";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/ehome"
          element={
            <ELayout>
              <EHome />
            </ELayout>
          }
        />
        <Route
          path="/employer/employerprofile"
          element={
            <ELayout>
              <EmployerProfile />
            </ELayout>
          }
        />
        <Route
          path="/postjob"
          element={
            <ELayout>
              <PostJob />
            </ELayout>
          }
        />
        <Route
          path="/appliedcandidates"
          element={
            <ELayout>
              <AppliedCandidates />
            </ELayout>
          }
        />
        <Route
          path="/jobs"
          element={
            <ELayout>
              <Jobs />
            </ELayout>
          }
        />
        <Route
          path="/employer/eprofileedit"
          element={
            <ELayout>
              <EProfileEdit />
            </ELayout>
          }
        />

         {/* User Home Route */}
         <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {/* User Home Route */}
        <Route
          path="/jobseeker/job/:id"
          element={
            <Layout>
              <JobSeekerJobDetail />
            </Layout>
          }
        />

        {/* Job Application Route */}
        <Route
          path="/jobs/:id/apply"
          element={
            <Layout>
              <JobApplicationForm />
            </Layout>
          }
        />
        
        <Route
          path="/jobseeker/jobseekerprofile"
          element={
            <Layout>
              <JobseekerProfile />
            </Layout>
          }
        />
        <Route
          path="/jobseeker/jprofileedit"
          element={
            <Layout>
              <JProfileEdit />
            </Layout>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          }
        />
        <Route
          path="/pendingjobs"
          element={
            <AdminLayout>
              <PendingJobs />
            </AdminLayout>
          }
        />

<Route
          path="/adminappliedjobs"
          element={
            <AdminLayout>
              <AdminAppliedJobs />
            </AdminLayout>
          }
        />
<Route
          path="/admin/joblist"
          element={
            <AdminLayout>
              <AdminJobList />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <AdminLayout>
              <EmployeeList />
            </AdminLayout>
          }
        />
        {/* Job Detail Route */}
        <Route
          path="/job/:jobId"
          element={
            <AdminLayout>
              <JobDetail />
            </AdminLayout>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;