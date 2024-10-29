// src/features/auth/authApi.js
import axios from 'axios';
import { loginSuccess, logout } from './authSlice';

const API_URL = 'http://localhost:8000/api/';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}login/`, credentials);
    const data = response.data;

    // If there is an error message, throw it as an error
    if (data.error) {
      throw new Error(data.error);
    }
    
    dispatch(loginSuccess({ user: data.user_type, access: data.access, refresh: data.refresh }));
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return { user_type: data.user_type };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

// Logout function
export const logoutUser = () => async (dispatch) => {
  try {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Send a request to the logout endpoint with the token in the headers
    await axios.post(
      `${API_URL}logout/`,
      {}, // No data payload needed
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Dispatch the logout action
    dispatch(logout());

    // Clear tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error('Logout failed');
  }
};
