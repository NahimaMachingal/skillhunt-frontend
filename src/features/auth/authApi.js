// src/features/auth/authApi.js
import axios from "axios";
import { loginSuccess, logout } from "./authSlice";

const API_URL = "http://localhost:8000/api/";

// Refresh Token API Call
export const refreshAccessToken = async (dispatch, getState) => {
  try {
    const state = getState();
    const refreshToken = state.auth.refreshToken || localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await apiClient.post(`token/refresh/`, {
      refresh: refreshToken,
    });

    const { access, refresh } = response.data;

    dispatch(
      loginSuccess({
        user: state.auth.user,
        access,
        refresh: refresh || refreshToken,
      })
    );

    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    dispatch(logout());
    throw error;
  }
};




export const googleLogin = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}google-login/`, data);
    const { user, user_type, access, refresh } = response.data;

    dispatch(loginSuccess({ user: user_type, access, refresh }));
    
    return { user_type, user };
  } catch (error) {
    console.error('Google login failed:', error);
    throw new Error('Google login failed');
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}login/`, credentials);
    const { user, user_type, access, refresh } = response.data;

    
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