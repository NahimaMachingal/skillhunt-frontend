// src/features/users/usersApi.js
import axios from 'axios';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from './usersSlice';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await axios.get(`${API_URL}/users/`);
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure('Failed to fetch users'));
  }
};
