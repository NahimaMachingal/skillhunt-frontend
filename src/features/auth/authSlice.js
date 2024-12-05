// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  user_type: localStorage.getItem("user_type") || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user,user_type, access, refresh } = action.payload;

      state.user = user;
      state.user_type = user_type;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;

      // Save tokens and user info to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_type", user_type); 
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    },
    logout: (state) => {
      state.user = null;
      state.user_type = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Clear tokens and user info from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("user_type");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
