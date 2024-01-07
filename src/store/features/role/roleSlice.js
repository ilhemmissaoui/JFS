import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roleService from './roleService';

const initialState = {
  roles: null,
  allRoles: null,
  currentPage: null,
  lastPage: null,
  permissions: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get permission options
export const getPermissions = createAsyncThunk(
  'role/permission',
  async (token, thunkAPI) => {
    try {
      return await roleService.permissions(token);
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

// Get Roles Per Page
export const getRolesPerPage = createAsyncThunk(
  'role/pages',
  async (param, thunkAPI) => {
    try {
      return await roleService.rolesPerPage(param);
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

// Get All Roles
export const getRoles = createAsyncThunk(
  'role/all',
  async (token, thunkAPI) => {
    try {
      return await roleService.allRoles(token);
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

// Register Role
export const addRole = createAsyncThunk(
  'role/create',
  async (roleData, thunkAPI) => {
    try {
      console.log('roleData', roleData);
      return await roleService.createRole(roleData);
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

// Update Role
export const updateRole = createAsyncThunk(
  'role/update',
  async (roleUpdateData, thunkAPI) => {
    try {
      return await roleService.updateRole(roleUpdateData);
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

// Update Role
export const deleteRole = createAsyncThunk(
  'role/delete',
  async (dataRole, thunkAPI) => {
    try {
      return await roleService.deleteRole(dataRole);
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

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.permissions = null;
      })
      .addCase(getRolesPerPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRolesPerPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
      })
      .addCase(getRolesPerPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.roles = null;
      })
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRoles = action.payload.data;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allRoles = null;
      })
      .addCase(addRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roleSlice.actions;
export default roleSlice.reducer;
