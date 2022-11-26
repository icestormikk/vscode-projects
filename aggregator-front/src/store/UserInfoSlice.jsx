/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const adminInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: {
    username: '',
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = adminInfoSlice.actions;
export default adminInfoSlice.reducer;
