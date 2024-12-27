import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/resume`;


// Fetch About Me Data
export const fetchAboutMe = createAsyncThunk(
  'aboutMe/fetchAboutMe',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/about-me/`, {
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

// Create or Update About Me
export const createOrUpdateAboutMe = createAsyncThunk(
  'aboutMe/createOrUpdateAboutMe',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}/about-me/`, data, {
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
// Fetch Address
export const fetchAddress = createAsyncThunk(
  'address/fetchAddress',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/address/`, {
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
// Update Address
export const createOrUpdateAddress = createAsyncThunk(
  'address/createOrUpdateAddress',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}/address/`, data, {
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
// Create Skill
export const fetchSkill = createAsyncThunk(
    'skills/fetchSkill',
    async (data, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const response = await axios.get(`${API_URL}/skills/`,  {
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

  // Update Address
export const createOrUpdateSkill = createAsyncThunk(
  'skill/createOrUpdateSkill',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}/skills/`, data, {
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

 // Create Projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/projects/`,  {
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

// Update Address
export const createOrUpdateProjects = createAsyncThunk(
'projects/createOrUpdateProjects',
async (data, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;
    const response = await axios.post(`${API_URL}/projects/`, data, {
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
  
  // Create experience
export const fetchExperience = createAsyncThunk(
  'experience/fetchExperience',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/experience/`,  {
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

// Update experience
export const createOrUpdateExperience = createAsyncThunk(
'experience/createOrUpdateExperience',
async (data, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;
    const response = await axios.post(`${API_URL}/experience/`, data, {
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

// Create education
export const fetchEducation = createAsyncThunk(
  'education/fetchEducation',
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/education/`,  {
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

// Update Education
export const createOrUpdateEducation = createAsyncThunk(
'education/createOrUpdateEducation',
async (data, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;
    const response = await axios.post(`${API_URL}/education/`, data, {
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

// Fetch Resume Data
export const fetchResumeData = createAsyncThunk(
  'resume/fetchResumeData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/resume/`, {
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


const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch About Me
    .addCase(fetchAboutMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAboutMe.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload || {};
    })
    .addCase(fetchAboutMe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching data';
      state.data = {}; // Reset to an empty object if an error occurs
    })
    // Create or Update About Me
    .addCase(createOrUpdateAboutMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createOrUpdateAboutMe.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(createOrUpdateAboutMe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      
      // Fetch Address
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching data';
        state.data = {}; // Reset to an empty object if an error occurs
      })
      
      .addCase(createOrUpdateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Updated data saved back to state
      })
      .addCase(createOrUpdateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // Fetch Address
       .addCase(fetchSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching data';
        state.data = {}; // Reset to an empty object if an error occurs
      })
      
      .addCase(createOrUpdateSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Updated data saved back to state
      })
      .addCase(createOrUpdateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Projects
       .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching data';
        state.data = {}; // Reset to an empty object if an error occurs
      })
      
      .addCase(createOrUpdateProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Updated data saved back to state
      })
      .addCase(createOrUpdateProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Fetch Education
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching data';
        state.data = {}; // Reset to an empty object if an error occurs
      })
      
      .addCase(createOrUpdateEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Updated data saved back to state
      })
      .addCase(createOrUpdateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Experience
      .addCase(fetchExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching data';
        state.data = {}; // Reset to an empty object if an error occurs
      })
      
      .addCase(createOrUpdateExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Updated data saved back to state
      })
      .addCase(createOrUpdateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




      




      .addCase(fetchResumeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchResumeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default resumeSlice.reducer;
