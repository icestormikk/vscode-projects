/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: {
    userInfo: {
      username: '',
      phone: '',
      email: '',
      roles: [],
    },
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { user } = action.payload;

      if (Object.hasOwn(user, 'password')) {
        delete user.password;
      }
      if (Object.hasOwn(user, 'confirmPassword')) {
        delete user.confirmPassword;
      }

      Object.assign(state.userInfo, user);
      state.isLoggedIn = true;
    },
    logout(state) {
      state.username = '';
      state.roles = [];
    },
  },
});

export const { login, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;
