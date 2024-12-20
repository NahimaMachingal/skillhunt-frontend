//src/components/features/interview/interviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000/api/interview/'; // Update API_URL for consistency

// Thunk for scheduling interviews
export const scheduleInterview = createAsyncThunk(
  "interview/scheduleInterview",
  async (interviewData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}interview/schedule/`, interviewData, {
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

export const fetchUserInterviews = createAsyncThunk(
  'interview/fetchUserInterviews',
  async (_, { getState, rejectWithValue }) => {
      try {
          const state = getState();
          const accessToken = state.auth.accessToken; // Access token from state
          const response = await axios.get(`${API_URL}user-interviews/`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
      }
  }
);

export const fetchEmployerInterviews = createAsyncThunk(
  'interview/fetchEmployerInterviews',
  async (jobId, { getState, rejectWithValue }) => {
      try {
          const state = getState();
          const accessToken = state.auth.accessToken;
          const response = await axios.get(`${API_URL}employer-interviews/${jobId}/`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || 'Something went wrong');
      }
  }
);

export const fetchEmployerScheduledInterviews = createAsyncThunk(
  'interview/fetchEmployerScheduledInterviews',
  async (jobId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken; // Assuming the token is stored in the auth slice
      const response = await axios.get(`${API_URL}employer/interviews/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data; // Returns the fetched interviews
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const updateInterviewStatus = createAsyncThunk(
  'interview/updateInterviewStatus',
  async ({ interviewId, newStatus }, { getState, rejectWithValue }) => {
      try {
          const state = getState();
          const accessToken = state.auth.accessToken;
          const response = await axios.patch(
              `${API_URL}interview/${interviewId}/`,
              { status: newStatus },
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
              }
          );
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || 'Failed to update status');
      }
  }
);

// Slice for interview management
const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    loading: false,
    interviews: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scheduleInterview.pending, (state) => {
        state.loading = true;
      })
      .addCase(scheduleInterview.fulfilled, (state) => {
        state.loading = false;
        toast.success("Interview scheduled successfully!");
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to schedule the interview.");
      })
      .addCase(fetchUserInterviews.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchUserInterviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interviews = action.payload; // Store interviews
    })
    .addCase(fetchUserInterviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
    })
    .addCase(fetchEmployerInterviews.pending, (state) => {
      state.status = 'loading';
  })
  .addCase(fetchEmployerInterviews.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.interviews = action.payload;
  })
  .addCase(fetchEmployerInterviews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
  })

  .addCase(updateInterviewStatus.fulfilled, (state, action) => {
                const updatedInterview = action.payload;
                state.interviews = state.interviews.map((interview) =>
                    interview.id === updatedInterview.id ? updatedInterview : interview
                );
            })
            .addCase(updateInterviewStatus.rejected, (state, action) => {
                state.error = action.payload;
                toast.error('Failed to update interview status');
            })

            .addCase(fetchEmployerScheduledInterviews.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(fetchEmployerScheduledInterviews.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.interviews = action.payload;
            })
            .addCase(fetchEmployerScheduledInterviews.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
            });
  },
});

export default interviewSlice.reducer;
