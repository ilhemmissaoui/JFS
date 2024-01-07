import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentService from './studentService';
const initialState = {
  status: null,
  classes: null,
  civilities: null,
  promotions: null,
  contracts: null,
  isSuccess: false,
  currentPage: null,
  totalPages: null,
  student: null,
  studentsList: [],
  isLoading: false,
  isRedirect: false,
  isError: false,
  message: '',
  nbStudent: null,
  studentPercent: {},
};
export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (token, { rejectWithValue }) => {
    try {
      return await studentService.getStudents(token);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const StudentByContrat = createAsyncThunk(
  'student/StudentByContrat',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.StudentByContrat();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getNbStudents = createAsyncThunk(
  'student/getNbStudents',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getNbStudents();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getStudentsPerPage = createAsyncThunk(
  'student/getStudentsPerPage',
  async (data, { rejectWithValue }) => {
    try {
      return await studentService.getStudentsPerPage(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getStudentsById = createAsyncThunk(
  'student/getStudentsById',
  async (id, { rejectWithValue }) => {
    try {
      return await studentService.getStudentsById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const addStudents = createAsyncThunk(
  'student/addStudent',
  async (data, thunkAPI) => {
    //return await studentService.addStudent(token, data);
    try {
      return await studentService.addStudent(data);
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
export const editStudent = createAsyncThunk(
  'student/editStudent',
  async (data, thunkAPI) => {
    try {
      await studentService.editStudent(data);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      error.toSring();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClassById = createAsyncThunk(
  'student/getContratById',
  async (classeId, { rejectWithValue }) => {
    try {
      return await studentService.getClassById(classeId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);
export const getPromoById = createAsyncThunk(
  'student/getPromoById',
  async (promotionId, { rejectWithValue }) => {
    try {
      return await studentService.getPromoById(promotionId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);
export const getContratById = createAsyncThunk(
  'student/getContratById',
  async (contratId, { rejectWithValue }) => {
    try {
      return await studentService.getContratById(contratId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);

export const getStatus = createAsyncThunk(
  'student/getStatus',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getStatus();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);

export const getCivilite = createAsyncThunk(
  'student/getCivilite',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getCivilite();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);

export const getClasses = createAsyncThunk(
  'student/getClasses',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getClasses();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);
export const getPromotions = createAsyncThunk(
  'student/getPromotions',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getPromotions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);
export const getContracts = createAsyncThunk(
  'student/getContracts',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getContracts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSring();
      return rejectWithValue(message);
    }
  }
);
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    IsReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.status = null;
        state.message = action.payload;
      })
      .addCase(getCivilite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCivilite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.civilities = action.payload;
      })
      .addCase(getCivilite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.civilities = null;
        state.message = action.payload;
      })
      .addCase(getPromotions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.promotions = action.payload;
      })
      .addCase(getPromotions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.promotions = null;
        state.message = action.payload;
      })
      .addCase(getContracts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contracts = action.payload;
      })
      .addCase(getContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.contracts = null;
        state.message = action.payload;
      })
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.classes = null;
        state.message = action.payload;
      })
      .addCase(getNbStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNbStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nbStudent = action.payload;
      })
      .addCase(getNbStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.nbStudent = null;
        state.message = action.payload;
      })
      .addCase(StudentByContrat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(StudentByContrat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentPercent = action.payload;
      })
      .addCase(StudentByContrat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.studentPercent = null;
        state.message = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentsList = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.last_page;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getStudentsPerPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentsPerPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentsList = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.last_page;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getStudentsPerPage.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getStudentsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getStudentsById.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(addStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudents.fulfilled, (state, action) => {
        state.studentsList.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(addStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { IsReset } = studentSlice.actions;
export default studentSlice.reducer;
