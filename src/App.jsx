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
import EmployerProfile from "./components/employer/EmployerProfile";
import EProfileEdit from "./components/employer/EProfileEdit";
import PostJob from "./components/employer/PostJob";
import Jobs from "./components/employer/Jobs";
import PendingJobs from "./components/Admin/PendingJobs";
import JobDetail from "./components/Admin/JobDetail";
import JobSeekerJobDetail from "./components/jobseeker/JobseekerJobDetail";
import JobApplicationForm from "./components/jobseeker/JobApplicationForm";
import AdminJobList from "./components/Admin/AdminJobList";
import AppliedCandidates from "./components/employer/AppliedCandidates";
import AdminAppliedJobs from "./components/Admin/AdminAppliedJobs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import UserVerification from "./components/Admin/UserVerification";
import VerifyOTP from "./components/Auth/VerifyOTP";
import EditJobDetail from "./components/employer/EditJobDetail";
import ApplicantsForJob from "./components/employer/ApplicantsForJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./components/jobseeker/Chat";
import EmployerChat from "./components/employer/EmployerChat";
import Dashboard from "./components/jobseeker/Dashboard";
import InterviewCandidates from "./components/employer/InterviewCandidates";
import AuthHOC from "./components/AuthHOC";
import ScheduleInterview from "./components/Interview/ScheduleInterview";
import InterviewDetails from "./components/Interview/InterviewDetails";
import ApplicantsForInterview from "./components/Interview/ApplicantsForInterview";
import ScheduledInterviews from "./components/Interview/ScheduledInterviews";
import ResumeLanding from "./components/Resume/ResumeLanding";
import AboutMe from "./components/Resume/AboutMe";
import Address from "./components/Resume/Address";
import Skill from "./components/Resume/Skill";
import Projects from "./components/Resume/Projects";
import Education from "./components/Resume/Education";
import Experience from "./components/Resume/Experience"
import CreateResume from "./components/Resume/CreateResume";
import InterviewedCandidates from "./components/Interview/InterviewedCandidates";
import FeedbackForm from "./components/Interview/FeedbackForm";
import FeedbackReview from "./components/Interview/FeedbackReview";
import JobseekerFeedback from "./components/jobseeker/JobseekerFeedback";
import Reason from "./components/employer/Reason";
import Rejections from "./components/jobseeker/Rejections";
import JobseekerSubscribe from "./components/jobseeker/JobseekerSubscribe";
import JobseekerChatbot from "./components/jobseeker/JobseekerChatbot";
import EmployerChatbot from "./components/employer/EmployerChatbot";
import SubscriptionForm from "./components/jobseeker/SubsciptionForm";
import PaymentSuccess from "./components/jobseeker/PaymentSuccess";
import MainHome from "./components/jobseeker/MainHome";


const App = () => {
  const restrictedPaths = [
    "/home",
    "/jobs",
    "/ehome",
    "/jobseeker/jobseekerprofile",
    "/employer/employerprofile",
    "/postjob",
    "/appliedcandidates",
    "/job/:jobId",
    "/edit-job/:id",
    "/jobseeker/jprofileedit",
    "/admin/home",
    "/employerchat",
    "/job/:jobId/applicants",
    "/interviewcandidates",
    "/employer/eprofileedit",
    "/jobseeker/job/:id",
    "/jobs/:id/apply",
    "/dashboard",
    "/chat",
    "/pendingjobs",
    "/userverification",
    "/adminappliedjobs",
    "/admin/joblist",
    "/admin/employees",
    "/schedule/:applicantId",
    "/interview-details/:jobId",
    "/employer/jobs/:jobId/interviews",
    "/scheduledinterviews",
    "/resumelanding",
    "/aboutme",
    "/address",
    "/skill",
    "/projects",
    "/education",
    "/experience",
    "/create/resume",
    "/interviewedcandidates",
    "/feedback/:interviewId",
    "/review/:interviewId",
    "/jobseeker/feedbacks",
    "/reason/:applicationId",
    "/jobseeker/rejections",
    "/jobseekersubscribe",
    "/jobseeker/chatbot",
    "/employer/chatbot",
    "/subscriptionform",
    "/payment-success",
    "/mainhome",


    // Add other paths that need authentication here
  ];
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
          path="/ehome"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>              
              <EHome />              
            </ELayout>
            </AuthHOC>
          }
        />
        <Route
          path="/employer/employerprofile"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <EmployerProfile />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/mainhome"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <MainHome />
            </Layout>
            </AuthHOC>
          }
        />

<Route
          path="/interviewedcandidates"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <InterviewedCandidates />
            </ELayout>
            </AuthHOC>
          }
        />
        <Route
          path="/postjob"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <PostJob />
            </ELayout>
            </AuthHOC>
          }
        />
        <Route
          path="/appliedcandidates"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <AppliedCandidates />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/feedback/:interviewId"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <FeedbackForm />
            </ELayout>
            </AuthHOC>
          }
        />
        <Route
          path="/reason/:applicationId"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <Reason />
            </ELayout>
            </AuthHOC>
          }
        />


<Route
          path="/jobseeker/rejections"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Rejections />
            </Layout>
            </AuthHOC>
          }
        />


<Route
          path="/review/:interviewId"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <FeedbackReview />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/employer/jobs/:jobId/interviews"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <ApplicantsForInterview />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/employerchat"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <EmployerChat />
            </ELayout>
            </AuthHOC>
          }
        />
<Route
          path="/job/:jobId/applicants"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <ApplicantsForJob />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/scheduledinterviews"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <ScheduledInterviews />
            </ELayout>
            </AuthHOC>
          }
        />

        <Route
          path="/jobs"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <Jobs />
            </ELayout>
            </AuthHOC>
          }
        />
        <Route
          path="/interviewcandidates"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <InterviewCandidates />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/schedule/:applicantId"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <ScheduleInterview />
            </ELayout>
            </AuthHOC>
          }
        />
        <Route
         path="/edit-job/:id" 
         element={
          <AuthHOC restrictedPaths={restrictedPaths}>
           <ELayout>
             <EditJobDetail />
           </ELayout>
           </AuthHOC>
         } /> 
        <Route
          path="/employer/eprofileedit"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <EProfileEdit />
            </ELayout>
            </AuthHOC>
          }
        />

<Route
          path="/employer/chatbot"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <ELayout>
              <EmployerChatbot />
            </ELayout>
            </AuthHOC>
          }
        />

         {/* User Home Route */}
         <Route
         path="/home"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Home />
            </Layout>
            </AuthHOC>
          }
        />
        

        <Route
         path="/jobseekersubscribe"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JobseekerSubscribe />
            </Layout>
            </AuthHOC>
          }
        />

        {/* User Home Route */}
        <Route
         path="/jobseeker/feedbacks"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JobseekerFeedback />
            </Layout>
            </AuthHOC>
          }
        />

<Route
         path="/aboutme"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <AboutMe />
            </Layout>
            </AuthHOC>
          }
        />


        <Route
         path="/address"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Address />
            </Layout>
            </AuthHOC>
          }
        />

<Route
         path="/skill"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Skill />
            </Layout>
            </AuthHOC>
          }
        />


<Route
         path="/payment-success"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <PaymentSuccess />
            </Layout>
            </AuthHOC>
          }
        />

<Route
         path="/subscriptionform"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <SubscriptionForm />
            </Layout>
            </AuthHOC>
          }
        />
<Route
         path="/jobseeker/chatbot"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JobseekerChatbot />
            </Layout>
            </AuthHOC>
          }
        />
        <Route
         path="/projects"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Projects />
            </Layout>
            </AuthHOC>
          }
        />

<Route
         path="/education"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Education />
            </Layout>
            </AuthHOC>
          }
        />

<Route
         path="/create/resume"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <CreateResume />
            </Layout>
            </AuthHOC>
          }
        />

<Route
         path="/experience"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Experience />
            </Layout>
            </AuthHOC>
          }
        />

        
        <Route
         path="/interview-details/:jobId"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <InterviewDetails />
            </Layout>
            </AuthHOC>
          }
        />
        {/* User Home Route */}
        <Route
          path="/jobseeker/job/:id"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JobSeekerJobDetail />
            </Layout>
            </AuthHOC>
          }
        />

        {/* Job Application Route */}
        <Route
          path="/jobs/:id/apply"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JobApplicationForm />
            </Layout>
            </AuthHOC>
          }
        />

        
        {/* Resume Route */}
        <Route
          path="/resumelanding"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <ResumeLanding />
            </Layout>
            </AuthHOC>
          }
        />
        {/* Job Application Route */}
        <Route
          path="/dashboard"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <Dashboard />
            </Layout>
            </AuthHOC>
          }
        />
        
        <Route
          path="/jobseeker/jobseekerprofile"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JobseekerProfile />
            </Layout>
            </AuthHOC>
          }
        />
    <Route
          path="/chat"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
              <Chat />
              </AuthHOC>
            
          }
        />


        <Route
          path="/jobseeker/jprofileedit"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <Layout>
              <JProfileEdit />
            </Layout>
            </AuthHOC>
          }
        />
        


        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
            </AuthHOC>
          }
        />
        <Route
          path="/pendingjobs"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <PendingJobs />
            </AdminLayout>
            </AuthHOC>
          }
        />

<Route
          path="/userverification"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <UserVerification />
            </AdminLayout>
            </AuthHOC>
          }
        />


<Route
          path="/adminappliedjobs"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <AdminAppliedJobs />
            </AdminLayout>
            </AuthHOC>
          }
        />
<Route
          path="/admin/joblist"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <AdminJobList />
            </AdminLayout>
            </AuthHOC>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <EmployeeList />
            </AdminLayout>
            </AuthHOC>
          }
        />
        {/* Job Detail Route */}
        <Route
          path="/job/:jobId"
          element={
            <AuthHOC restrictedPaths={restrictedPaths}>
            <AdminLayout>
              <JobDetail />
            </AdminLayout>
            </AuthHOC>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            
              <ForgotPassword />
            
          }
        />

<Route
          path="/reset-password"
          element={
            
              <ResetPassword />
            
          }
        />
        

      </Routes>
    </Router>
    <ToastContainer />
    </GoogleOAuthProvider>
  );
};

export default App;