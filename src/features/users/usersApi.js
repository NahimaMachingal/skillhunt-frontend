// src/features/users/usersApi.js
import axios from 'axios';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from './usersSlice';

const API_URL = 'http://localhost:8000/api/';

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await axios.get(`${API_URL}users/`);
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure('Failed to fetch users'));
  }
};
