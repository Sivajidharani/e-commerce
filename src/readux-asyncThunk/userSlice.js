import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupUser = createAsyncThunk('user/signupUser', async ({ email, password }) => {
  const response = await axios.post('/api/signup', { email, password });
  return response.data;
});

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: null, status: 'idle', error: null },
  reducers: {
    logout(state) {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
