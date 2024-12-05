// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import usersReducer from './features/users/usersSlice';
import profileReducer from './features/jobseekerprofile/jobseekerProfileSlice';
import jobReducer from './features/job/jobSlice';
import chatReducer from './features/chat/chatSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    profile: profileReducer, 
    job: jobReducer,
    chat: chatReducer,
  },
});

export default store;
