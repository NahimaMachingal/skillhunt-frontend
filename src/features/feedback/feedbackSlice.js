//src/feactures/feedbackSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/interview/`;


export const fetchFeedbacksForJobseeker = createAsyncThunk(
  'feedback/fetchFeedbacksForJobseeker',
  async (_, {getState, rejectWithValue }) => {
    try {
        const state = getState();
      const accessToken = state.auth.accessToken; 
      const response = await axios.get(`${API_URL}jobseeker/feedbacks/`,{
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

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacksForJobseeker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedbacksForJobseeker.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacksForJobseeker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
