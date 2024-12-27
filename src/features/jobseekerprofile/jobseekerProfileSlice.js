// src/features/jobseekerprofile/jobseekerProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/profile/`;


// Thunk for fetching the profile
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth?.accessToken;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



// Add a new thunk for updating the profile
export const updateProfile = createAsyncThunk('profile/updateProfile', async (updatedData, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth?.accessToken;
  try {
    const response = await axios.put(API_URL, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: {}, // Initialize data as an empty object
    status: 'idle',
    updateStatus: 'idle', // Separate status for updating
    error: null,
    updateError: null, // Separate error for updating

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear any previous error
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Ensure data is set to an empty object if the payload is empty
        state.data = action.payload || {};
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Profile Cases
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = 'loading';
        state.updateError = null; // Clear any previous update error
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        state.data = action.payload || {}; // Update the state data with the updated profile
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.payload;
      });
  },
});

export default profileSlice.reducer;
