// src/features/job/jobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/job/`;


// Thunk for posting a job
export const postJob = createAsyncThunk('job/postJob', async (jobData, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.post(`${API_URL}post/`, jobData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json', // Ensure correct content type
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

// Thunk for fetching jobs
export const fetchJobs = createAsyncThunk('job/fetchJobs', async (_, {getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}jobs/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add this thunk for fetching pending jobs
export const fetchPendingJobs = createAsyncThunk('job/fetchPendingJobs', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}pending-jobs/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching a single job by ID
export const fetchJobById = createAsyncThunk('job/fetchJobById', async (jobId, {getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}job/${jobId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});




// Update job
export const updateJob = createAsyncThunk(
    'job/updateJob',
    async ({ id, ...jobData }, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.put(`${API_URL}updatejob/${id}/`, jobData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data; // Return updated job details from the API response
      } catch (error) {
        // Handle cases where no response data exists
        const errorMessage = error.response?.data || 'An error occurred while updating the job.';
        return rejectWithValue(errorMessage);
      }
    }
  );

  // Add this in jobSlice.js
export const deleteJob = createAsyncThunk(
    'job/deleteJob',
    async (id, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.delete(`${API_URL}updatejob/${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data; // Return success response
      } catch (error) {
        const errorMessage = error.response?.data || 'An error occurred while deleting the job.';
        return rejectWithValue(errorMessage);
      }
    }
  );
  
  

export const approveJob = createAsyncThunk('job/approveJob', async (jobId, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.post(`${API_URL}job/approve/${jobId}/`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching approved jobs
export const fetchApprovedJobs = createAsyncThunk('job/fetchApprovedJobs', async (_, {getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}approved-jobs/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchJobSeekerJobById = createAsyncThunk('job/fetchJobSeekerJobById', async (jobId, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}job/jobseeker/${jobId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const submitJobApplication = createAsyncThunk('job/submitJobApplication', async (applicationData, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.post(`${API_URL}apply/`, applicationData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching all jobs (Admin)
export const fetchAdminJobs = createAsyncThunk('adminJob/fetchAdminJobs', async (_, {getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}admin/jobs/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Add this thunk for fetching applied candidates
export const fetchAppliedCandidates = createAsyncThunk('job/fetchAppliedCandidates', async (_, {getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}applied-candidates/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for updating the application status
export const updateApplicationStatus = createAsyncThunk('job/updateApplicationStatus', async ({ applicationId, status }, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.patch(`${API_URL}application/${applicationId}/`, { status }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchApplicantsForJob = createAsyncThunk(
    "job/fetchApplicantsForJob",
    async (jobId, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}job/${jobId}/applicants/`, {
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

  // Thunk to update the reason for an application
export const updateReason = createAsyncThunk(
    "job/updateReason",
    async ({ applicationId, reason }, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.patch(
          `${API_URL}application/${applicationId}/reason/`,
          { reason },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  

  // Add this in jobSlice.js
export const fetchUserAppliedJobs = createAsyncThunk(
    'job/fetchUserAppliedJobs',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken; // Assuming auth token is stored in the state
            const response = await axios.get(`${API_URL}user/applied-jobs/`, {
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

export const fetchAdminApplications = createAsyncThunk(
    'job/fetchAdminApplications',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
        const accessToken = state.auth.accessToken;
            const response = await axios.get(`${API_URL}admin/applications/`, {
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

// jobSlice.js
export const checkIfApplied = createAsyncThunk(
    'job/checkIfApplied',
    async (jobId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;
            const response = await axios.get(`${API_URL}jobs/${jobId}/is-applied/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data.is_applied;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchRejectedJobs = createAsyncThunk(
    "job/fetchRejectedJobs",
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}user/rejected-jobs/`, {
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


const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobs: [], // Array to hold job listings
        approvedJobs: [], // Add this state to hold approved jobs
        pendingJobs: [],
        appliedCandidates: [],
        applicantsForJob: [],
        adminApplications: [],
        adminJobs: [],
        rejectedJobs: [],
        appliedJobs:[],
        job: null,
        status: 'idle',        
        error: null,
        isApplied: false,
        
    },
    reducers: {},
    extraReducers: (builder) => {
        // Post Job Cases
        builder
            .addCase(fetchRejectedJobs.pending, (state) => {
            state.status = "loading";
          })
            .addCase(fetchRejectedJobs.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.rejectedJobs = action.payload;
          })
            .addCase(fetchRejectedJobs.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
            .addCase(postJob.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Clear any previous error
            })
            .addCase(postJob.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.job = action.payload; // Set the newly posted job
            })
            .addCase(postJob.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || action.payload || 'An unknown error occurred'; // Set the error
                console.error('Job posting failed:', action.error);
            })

            .addCase(fetchUserAppliedJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserAppliedJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.appliedJobs = action.payload; // Store user-applied jobs
            })
            .addCase(fetchUserAppliedJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

                // Add cases for fetching pending jobs
            .addCase(fetchPendingJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPendingJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Assuming you want to store pending jobs in a separate array
                // If you want to merge with existing jobs, modify accordingly
                state.pendingJobs = action.payload; // You may need to define `pendingJobs` in initialState
            })
            .addCase(fetchPendingJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch Job by ID Cases
            .addCase(fetchJobById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.job = action.payload; // Set the job details in the state
            })
            .addCase(fetchJobById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch Job by ID Cases
            .addCase(updateJob.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.job = action.payload; // Set the job details in the state
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Add this thunk to the extraReducers in the jobSlice
            .addCase(approveJob.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(approveJob.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // You may want to update the state to reflect the approved job
            })
            .addCase(approveJob.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchApprovedJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchApprovedJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.approvedJobs = action.payload;
            })
            .addCase(fetchApprovedJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch JobSeeker Job by ID Cases
            .addCase(fetchJobSeekerJobById.pending, (state) => {
                console.log('Fetching job...');
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchJobSeekerJobById.fulfilled, (state, action) => {
                console.log("Job details fetched:", action.payload);
                state.status = 'succeeded';
                state.job = action.payload; // Set the job details in the state for jobseeker
            })
            .addCase(fetchJobSeekerJobById.rejected, (state, action) => {
                console.log('Failed to fetch job:', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(submitJobApplication.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitJobApplication.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(submitJobApplication.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            
            .addCase(checkIfApplied.fulfilled, (state, action) => {
                state.isApplied = action.payload;
            })
            

            .addCase(fetchAdminJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdminJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminJobs = action.payload;
            })
            .addCase(fetchAdminJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchAppliedCandidates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppliedCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedCandidates = action.payload;
            })
            .addCase(fetchAppliedCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                const index = state.applicantsForJob.findIndex((app) => app.id === action.payload.id);
                if (index !== -1) {
                    state.applicantsForJob[index].status = action.payload.status;
                }
            })
            .addCase(updateApplicationStatus.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(fetchApplicantsForJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicantsForJob.fulfilled, (state, action) => {
                state.loading = false;
                state.applicantsForJob = action.payload; // Correctly set the applicantsForJob state
            })
            .addCase(fetchApplicantsForJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchAdminApplications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdminApplications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminApplications = action.payload;
            })
            .addCase(fetchAdminApplications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(updateReason.fulfilled, (state, action) => {
                const index = state.applicantsForJob.findIndex(
                  (app) => app.id === action.payload.id
                );
                if (index !== -1) {
                  state.applicantsForJob[index].reason = action.payload.reason;
                }
              })
              .addCase(updateReason.rejected, (state, action) => {
                state.error = action.payload;
              });

            
    },
});

export default jobSlice.reducer;
