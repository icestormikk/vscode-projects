/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'headerSlice',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openHeader(state) {
      state.isOpen = true;
    },
    closeHeader(state) {
      state.isOpen = false;
    },
  },
});

export const { openHeader, closeHeader } = headerSlice.actions;
export default headerSlice.reducer;
