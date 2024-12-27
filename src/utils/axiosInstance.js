//src/utils/axiosInstance.js
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL ,
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (
      error.response.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post('/api/token/refresh/', {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // Handle refresh token failure, redirect to login, etc.
        console.error('Refresh token failed:', error);
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace('/login'); // Example: Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;



