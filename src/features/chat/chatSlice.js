//src/features/chat/chatSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/chat`; // Base URL for your API

// Fetch chat rooms with authorization header
export const fetchChatRooms = createAsyncThunk(
  'chat/fetchChatRooms',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;  // Get accessToken from Redux store
      const response = await axios.get(`${API_URL}/chatrooms/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Include token in the headers
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create chat room with authorization header
export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async ({ jobseekerId, employerId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}/chatrooms/`, {
        jobseeker_id: jobseekerId,
        employer_id: employerId
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.existing_room) {
        return error.response.data.existing_room;  // If room already exists, return existing room
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Get or create a chat room with authorization header
export const getOrCreateChatRoom = createAsyncThunk(
  'chat/getOrCreateChatRoom',
  async ({ jobseekerId, employerId }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.post(`${API_URL}/chatrooms/get_or_create/`, {
        jobseeker_id: jobseekerId,
        employer_id: employerId
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setCurrentChatRoom(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch messages for a specific chat room with authorization header
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatRoomId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const response = await axios.get(`${API_URL}/chatrooms/${chatRoomId}/messages/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Include token in the headers
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Send message to a specific chat room with authorization header
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatRoomId, content }, { getState, dispatch }) => {
    const state = getState();
    const user = state.auth.user;
    const accessToken = state.auth.accessToken;  // Get access token from state
    const tempMessage = {
      id: `temp-${Date.now()}`,
      content,
      sender: {
        id: user.id,
        name: user.name
      },
      timestamp: new Date().toISOString(),
    };
    dispatch(addMessage(tempMessage));

    try {
      const response = await axios.post(`${API_URL}/chatrooms/${chatRoomId}/messages/`, { content }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      dispatch(removeMessage(tempMessage.id));
      throw error;
    }
  }
);

// Update last message for a chat room
export const updateLastMessage = createAsyncThunk(
  'chat/updateLastMessage',
  async ({ chatRoomId, messageId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;  // Get accessToken from Redux store
      const response = await axios.put(
        `${API_URL}/chatrooms/${chatRoomId}/update_last_message/`,
        { message_id: messageId },
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

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatRooms: [],
    currentChatRoom: null,
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentChatRoom: (state, action) => {
      state.currentChatRoom = action.payload;
    },
    addMessage: (state, action) => {
      const newMessage = {
        ...action.payload,
        id: action.payload.id || `temp-${Date.now()}`,
      };
      state.messages.push(newMessage);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chatRooms = action.payload;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.chatRooms.push(action.payload);
        state.currentChatRoom = action.payload;
      })
      .addCase(updateLastMessage.fulfilled, (state, action) => {
        const updatedRoom = state.chatRooms.find(
          (room) => room.id === action.payload.chatRoomId
        );
        if (updatedRoom) {
          updatedRoom.lastMessage = action.payload.lastMessage;  // Update the last message
        }
      })
  },
});

export const { setCurrentChatRoom, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
