// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import profileReducer from './features/jobseekerprofile/jobseekerProfileSlice';
import jobReducer from './features/job/jobSlice';
import chatReducer from './features/chat/chatSlice';
import interviewReducer from './features/interview/interviewSlice';
import notificationReducer from './features/notifications/notificationSlice';
import resumeReducer from './features/resume/resumeSlice';
import feedbackReducer from './features/feedback/feedbackSlice';
import chatbotReducer from './features/chatbot/chatbotSlice';
import subscriptionReducer from './features/subscription/subscriptionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    profile: profileReducer, 
    job: jobReducer,
    chat: chatReducer,
    interview: interviewReducer,
    notifications: notificationReducer, 
    resume: resumeReducer,
    feedback: feedbackReducer, 
    chatbot: chatbotReducer,
    subscription: subscriptionReducer,
  },
});


export default store;
