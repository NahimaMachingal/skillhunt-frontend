// src/features/auth/authApi.js
import axios from "axios";
import { loginSuccess, logout } from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `${import.meta.env.VITE_API_URL}`;


export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken", // action type prefix
  async (_, { getState, dispatch }) => {
    try {
      const refreshToken =
        getState().auth.refreshToken || localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await axios.post(`${API_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      });

      const { access, refresh } = response.data;

      // Dispatch loginSuccess action
      dispatch(
        loginSuccess({
          user: getState().auth.user,
          access,
          refresh: refresh || refreshToken,
        }),
      );

      return access; // Return the new access token
    } catch (error) {
      console.error("Token refresh failed:", error);
      dispatch(logout()); // Dispatch logout if token refresh fails
      throw error;
    }
  },
);

export const googleLogin = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/google-login/`, data);
    const {user, user_type, access, refresh } = response.data;

    dispatch(loginSuccess({ user: user_type, access, refresh }));
    
    return { user_type, user };
  } catch (error) {
    console.error('Google login failed:', error);
    throw new Error('Google login failed');
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    const {user, user_type, access, refresh } = response.data;

    
    dispatch(loginSuccess({ user: user_type, access, refresh }));
    
    return { user_type, user};
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};


export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};