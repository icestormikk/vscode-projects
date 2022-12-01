/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState: {
    userInfo: {
      id: -1,
      firstname: '',
      lastname: '',
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
      state.userInfo = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        roles: [],
      };
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;
