/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const usersPath = 'http://localhost:8080/users';

export const defaultUser = {
  id: 0,
  firstname: 'Vasya',
  lastname: 'Pupkin',
  phone: '88005553535',
  email: 'vasyapupkin@test.com',
  roles: ['user'],
};

export const UsersAPI = {
  registerUser(user) {
    return axios
      .post(usersPath, user);
  },
  updateUser(user) {
    return axios
      .patch(usersPath, user);
  },
  deleteUser(user) {
    return axios
      .delete(usersPath, {
        params: {
          id: user.id,
        },
      });
  },
  verifyUser(data) {
    return axios
      .post('http://localhost:8080/authentication', data);
  },
};
