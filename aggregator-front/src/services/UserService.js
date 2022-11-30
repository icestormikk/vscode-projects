/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const usersPath = 'http://localhost:8080/auth';

export const UsersAPI = {
  registerUser(user) {
    return axios
      .post(usersPath, user);
  },
};
