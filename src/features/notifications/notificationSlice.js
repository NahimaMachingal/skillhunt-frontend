import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/chat`; // Base URL for your API

// Fetch notifications with authorization header
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken; // Get accessToken from Redux store
      const response = await axios.get(`${API_URL}/notifications/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Mark notification as read with authorization header
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}/notifications/${notificationId}/mark_as_read/`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    updateNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload.id
      );
      if (index !== -1) {
        state.notifications[index] = action.payload;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      });
  },
});

export const { addNotification, updateNotification, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
