// src/features/employerprofile/employerProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = `${import.meta.env.VITE_API_URL}/eprofile/`;


// Thunk for fetching the profile
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, thunkAPI) => {
  const state = thunkAPI.getState(); // Access the Redux state
  const token = state.auth?.accessToken; // Replace with the actual location of the token in your state
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
export const updateProfile = createAsyncThunk('eprofile/updateProfile', async (updatedData, thunkAPI) => {
  const state = thunkAPI.getState(); // Access the Redux state
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

// Thunk for fetching profile pic by ID
export const fetchProfileById = createAsyncThunk(
  'profile/fetchProfileById',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth?.accessToken;
    try {
      const response = await axios.get(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, profile_pic: response.data.profile_pic };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const eprofileSlice = createSlice({
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
      })
      .addCase(fetchProfileById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        const { id, profile_pic } = action.payload;
        state.data[id] = { profile_pic }; // Store by ID
        state.status = 'succeeded';
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default eprofileSlice.reducer;
