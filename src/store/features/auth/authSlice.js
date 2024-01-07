import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
let user = '';
try {
  user = JSON.parse(localStorage.getItem('user')) || '';
} catch (error) {}
const initialState = {
  user: user ? user : null,
  options: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAuthorized: null,
  message: '',
};

// Get status options
export const getOptions = createAsyncThunk('auth/option', async (thunkAPI) => {
  try {
    return await authService.options();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toSring();
    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forget password
export const forgetPassword = createAsyncThunk(
  'auth/resetpwd',
  async (user, thunkAPI) => {
    try {
      return await authService.resetPass(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  'auth/updatepwd',
  async (data, thunkAPI) => {
    try {
      return await authService.setNewPass(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    logout: (state) => {
      state.user = null;
      state.options = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isAuthorized = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.options = action.payload;
      })
      .addCase(getOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.options = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
        state.options = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
        state.isSuccess = action.payload?.isAuthorized ? true : false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
