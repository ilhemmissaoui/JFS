import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import faqService from './faqService';

const initialState = {
  faqs: null,
  status: 'idle',
  error: null,
};

export const getFAQS = createAsyncThunk(
  'faqs/getFAQs',
  async (token, { rejectWithValue }) => {
    try {
      const data = await faqService.getFAQ(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const faqSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFAQS.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFAQS.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqs = action.payload;
      })
      .addCase(getFAQS.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default faqSlice.reducer;
