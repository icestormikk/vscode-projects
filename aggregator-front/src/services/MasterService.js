/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import masterAvatar1 from '../static/pictures/master_avatar_1.jpg';
import masterAvatar2 from '../static/pictures/master_avatar_2.jpg';
import masterAvatar3 from '../static/pictures/master_avatar_3.jpg';

export const MastersAPI = {
  getMastersBySubserviceID(id) {
    return axios.get('http://localhost:8080/masters', {
      params: {
        serviceId: id,
      },
    })
      .data
      || [{
        id: 0,
        name: 'Имя',
        surname: 'Фамилия 0',
        professionTitle: 'Мастер по ноготочкам',
        phone: '88005553535',
        email: 'test1@test.com',
        imageProfileUrl: masterAvatar1,
        providedServiceIDs: [0],
        availableDates: [
          new Date(2022, 10, 8, 11, 30, 0).getTime(),
          new Date(2022, 10, 8, 12, 30, 0).getTime(),
        ],
      }, {
        id: 1,
        name: 'Имя',
        surname: 'Фамилия 1',
        professionTitle: 'Профессиональный парикмахер',
        phone: '88005553535',
        email: 'test2@test.com',
        imageProfileUrl: masterAvatar2,
        providedServiceIDs: [1],
        availableDates: [
          new Date(2022, 10, 8, 11, 30, 0).getTime(),
          new Date(2022, 10, 8, 13, 30, 0).getTime(),
        ],
      }, {
        id: 2,
        name: 'Имя',
        surname: 'Фамилия 2',
        professionTitle: 'Стажер-парикмахер',
        phone: '88005553535',
        email: 'test3@test.com',
        imageProfileUrl: masterAvatar3,
        providedServiceIDs: [1, 2],
        availableDates: [
          new Date(2022, 10, 10, 11, 30, 0).getTime(),
          new Date(2022, 10, 10, 14, 30, 0).getTime(),
        ],
      }];
  },
};
