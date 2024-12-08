//src/utils/utils.js

import store from "../store";

import axios from "axios";
import { logout } from "../features/auth/authSlice";

const API_URL = "http://localhost:8000/api/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized error and it's not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Refresh access token
        const refreshResponse = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = refreshResponse.data;

        // Update the access token in localStorage
        localStorage.setItem("accessToken", access);

        // Update the Authorization header and retry the request
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired:", refreshError);

        // Dispatch logout action if refresh fails
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
