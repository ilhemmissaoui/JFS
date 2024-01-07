import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaderId: false,
  id: '',
};

const loaderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loaderOn: (state, action) => {
      state.loaderId = true;
      state.id = action.payload;
    },
    loaderOff: (state) => {
      state.loaderId = false;
    },
  },
});

export const { loaderOn, loaderOff } = loaderSlice.actions;
export default loaderSlice.reducer;
