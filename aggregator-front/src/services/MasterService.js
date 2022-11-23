/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import masterAvatar1 from '../static/pictures/master_avatar_1.jpg';
import masterAvatar2 from '../static/pictures/master_avatar_2.jpg';
import masterAvatar3 from '../static/pictures/master_avatar_3.jpg';

export const defaultMasters = [{
  id: 0,
  name: 'Полина',
  surname: 'Соколова',
  professionTitle: 'Мастер по ноготочкам',
  phone: '8-(900)-123-32-01',
  email: 'polinasokolova@test.com',
  imageProfileUrl: masterAvatar1,
  providedServiceIDs: [0],
  availableDates: [
    new Date(2022, 10, 8, 11, 30, 0).getTime(),
    new Date(2022, 10, 8, 12, 30, 0).getTime(),
  ],
}, {
  id: 1,
  name: 'София',
  surname: 'Гаврилова',
  professionTitle: 'Профессиональный парикмахер',
  phone: '8-(900)-123-32-02',
  email: 'sofiagavrilova@test.com',
  imageProfileUrl: masterAvatar2,
  providedServiceIDs: [1],
  availableDates: [
    new Date(2022, 10, 8, 11, 30, 0).getTime(),
    new Date(2022, 10, 8, 13, 30, 0).getTime(),
  ],
}, {
  id: 2,
  name: 'Арина',
  surname: 'Степанова',
  professionTitle: 'Стажер-парикмахер',
  phone: '8-(900)-123-32-03',
  email: 'arinastepanova@test.com',
  imageProfileUrl: masterAvatar3,
  providedServiceIDs: [1, 2],
  availableDates: [
    new Date(2022, 10, 10, 11, 30, 0).getTime(),
    new Date(2022, 10, 10, 14, 30, 0).getTime(),
  ],
}];

export const MastersAPI = {
  getAllMasters() {
    return axios
      .get('http://localhost:8080/masters');
  },
  getMastersBySubserviceID(id) {
    return axios.get('http://localhost:8080/masters', {
      params: {
        serviceId: id,
      },
    });
  },
};
