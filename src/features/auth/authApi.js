// src/features/auth/authApi.js
import axios from 'axios';
import { loginSuccess, logout } from './authSlice';

const API_URL = 'http://localhost:8000/api/';

// Refresh Token API Call
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;

    // Update access token in local storage
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    // Remove tokens if refresh fails to avoid potential loops or unauthorized state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw error;
  }
};




export const googleLogin = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}google-login/`, data);
    const { user_type, access, refresh } = response.data;

    dispatch(loginSuccess({ user: user_type, access, refresh }));
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    return { user_type };
  } catch (error) {
    console.error('Google login failed:', error);
    throw new Error('Google login failed');
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}login/`, credentials);
    const data = response.data;

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

