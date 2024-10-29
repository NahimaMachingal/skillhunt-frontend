// src/features/job/jobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/job/'; // Update API_URL for consistency

// Thunk for posting a job
export const postJob = createAsyncThunk('job/postJob', async (jobData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}post/`, jobData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json', // Ensure correct content type
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching jobs
export const fetchJobs = createAsyncThunk('job/fetchJobs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}jobs/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add this thunk for fetching pending jobs
export const fetchPendingJobs = createAsyncThunk('job/fetchPendingJobs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}pending-jobs/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching a single job by ID
export const fetchJobById = createAsyncThunk('job/fetchJobById', async (jobId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}job/${jobId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const approveJob = createAsyncThunk('job/approveJob', async (jobId, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}job/approve/${jobId}/`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching approved jobs
export const fetchApprovedJobs = createAsyncThunk('job/fetchApprovedJobs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}approved-jobs/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchJobSeekerJobById = createAsyncThunk('job/fetchJobSeekerJobById', async (jobId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}job/jobseeker/${jobId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const submitJobApplication = createAsyncThunk('job/submitJobApplication', async (applicationData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}apply/`, applicationData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for fetching all jobs (Admin)
export const fetchAdminJobs = createAsyncThunk('adminJob/fetchAdminJobs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}admin/jobs/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Add this thunk for fetching applied candidates
export const fetchAppliedCandidates = createAsyncThunk('job/fetchAppliedCandidates', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}applied-candidates/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for updating the application status
export const updateApplicationStatus = createAsyncThunk('job/updateApplicationStatus', async ({ applicationId, status }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${API_URL}application/${applicationId}/`, { status }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAdminApplications = createAsyncThunk(
    'job/fetchAdminApplications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}admin/applications/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
        adminApplications: [],
        adminJobs: [],
        job: null,
        status: 'idle',        
        error: null,
        
    },
    reducers: {},
    extraReducers: (builder) => {
        // Post Job Cases
        builder
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
                state.error = action.payload; // Set the error
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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchJobSeekerJobById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.job = action.payload; // Set the job details in the state for jobseeker
            })
            .addCase(fetchJobSeekerJobById.rejected, (state, action) => {
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
                const index = state.appliedCandidates.findIndex((app) => app.id === action.payload.id);
                if (index !== -1) {
                    state.appliedCandidates[index].status = action.payload.status;
                }
            })
            .addCase(updateApplicationStatus.rejected, (state, action) => {
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
            });

            
    },
});

export default jobSlice.reducer;
