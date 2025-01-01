import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/chatbot/chatbot/`; // Base URL for the chatbot API

// Send a message to the chatbot API
export const sendMessage = createAsyncThunk(
    'chatbot/sendMessage',
    async (message, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const accessToken = state.auth.accessToken;
  
        // Correct the axios.post request with headers in the configuration
        const response = await axios.post(API_URL, 
          { message }, // Body of the request
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          } // Configuration with headers
        );
  
        return { sender: 'bot', text: response.data.response };
      } catch (error) {
        return rejectWithValue({ sender: 'bot', text: 'Error connecting to the server.' });
      }
    }
  );

  
const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.messages.push(action.payload);
        state.error = action.payload?.text || 'Unknown error';
      });
  },
});

export const { addMessage, clearMessages } = chatbotSlice.actions;

export default chatbotSlice.reducer;
