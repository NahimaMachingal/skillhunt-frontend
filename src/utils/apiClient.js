//src/utils/utils.js

import axios from "axios";
import store from "../store";
import { loginSuccess, logout } from "../features/auth/authSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const state = store.getState();
      let { access, refresh } = state.auth;

      // Check if the access token exists and is not expired
      if (!access || checkTokenExpired(access)) {
        // Attempt to refresh the token
        const response = await axios.post(`${config.baseURL}token/refresh/`, {
          refresh,
        });
        const { access: newAccessToken, refresh: newRefreshToken } = response.data;

        // Update the Redux store with the new tokens
        store.dispatch(
          loginSuccess({
            user: state.auth.user,
            access: newAccessToken,
            refresh: newRefreshToken || refresh,
          })
        );

        // Use the new access token in the request
        access = newAccessToken;
      }

      // Add the Authorization header
      config.headers.Authorization = `Bearer ${access}`;
    } catch (error) {
      console.error("Failed to refresh access token:", error);

      // If refreshing fails, log out the user
      store.dispatch(logout());
      throw error;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Function to check if a token is expired
function checkTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    console.error("Invalid token format:", error);
    return true; // Treat invalid tokens as expired
  }
}

export default apiClient;
