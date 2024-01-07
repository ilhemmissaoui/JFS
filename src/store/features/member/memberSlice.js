import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import memberService from './memberService';

const initialState = {
  roleOptions: null,
  classOptions: null,
  promoOptions: null,
  members: null,
  currentPage: null,
  lastPage: null,
  permissions: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get role options
export const getRolesOptions = createAsyncThunk(
  'member/role',
  async (token, thunkAPI) => {
    try {
      return await memberService.roles(token);
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

// Get Members Per Page
export const getMembersPerPage = createAsyncThunk(
  'member/pages',
  async (param, thunkAPI) => {
    try {
      return await memberService.membersPerPage(param);
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

// Register Member
export const addMember = createAsyncThunk(
  'member/create',
  async (memberData, thunkAPI) => {
    try {
      return await memberService.createMember(memberData);
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

// Update Member
export const updateMember = createAsyncThunk(
  'member/update',
  async (memberUpdateData, thunkAPI) => {
    try {
      return await memberService.updateMember(memberUpdateData);
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

// Update Member
export const deleteMember = createAsyncThunk(
  'member/delete',
  async (dataMember, thunkAPI) => {
    try {
      return await memberService.deleteMember(dataMember);
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

const memberSlice = createSlice({
  name: 'member',
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
      .addCase(getRolesOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRolesOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roleOptions = action.payload;
      })
      .addCase(getRolesOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.roleOptions = null;
      })
      .addCase(getMembersPerPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembersPerPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
      })
      .addCase(getMembersPerPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.members = null;
      })
      .addCase(addMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memberSlice.actions;
export default memberSlice.reducer;
