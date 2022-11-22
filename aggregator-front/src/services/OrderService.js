/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const OrdersAPI = {
  getAllOrders() {
    return axios
      .get('http://localhost:8080/orders')
      .data
      || [{
        id: 0,
        serviceTitle: 'Услуга N1',
        masterInfo: {
          name: 'Полина',
          surname: 'Соколова',
          professionTitle: 'Мастер по ноготочкам',
        },
        clientInfo: {
          name: 'София',
          surname: 'Гаврилова',
          phone: '8-800-555-35-35',
        },
        clientCommentary: 'Комментарий клиента',
        date: new Date(2022, 10, 24, 15, 20),
      },
      {
        id: 1,
        serviceTitle: 'Услуга N2',
        masterInfo: {
          name: 'Арина',
          surname: 'Степанова',
          professionTitle: 'Профессиональный парикмахер',
        },
        clientInfo: {
          name: 'Юрий',
          surname: 'Королев',
          phone: '8-800-555-35-36',
        },
        clientCommentary: '',
        date: new Date(2022, 10, 24, 16, 20),
      },
      {
        id: 2,
        serviceTitle: 'Услуга N3',
        masterInfo: {
          name: 'Мария',
          surname: 'Соколова',
          professionTitle: 'Стажер-парикмахер',
        },
        clientInfo: {
          name: 'Фатима',
          surname: 'Колесникова',
          phone: '8-800-555-35-37',
        },
        clientCommentary: '',
        date: new Date(2022, 10, 27, 10),
      }];
  },
  getSubservicesByServiceID(id) {
    return axios
      .get('http://localhost:8080/services', {
        params: {
          subserviceId: id > 0 ? id : 1,
        },
      })
      .data
      || [{
        id: 0,
        title: 'Стрижка 1',
        description: 'Описание стрижки 1',
        // in minutes (?)
        duration: 40,
        // in rubles
        lowerPrice: 100,
        // in rubles
        topPrice: 200,
        incompatibleServicesIDs: [1],
      },
      {
        id: 1,
        title: 'Стрижка 2',
        description: 'Описание стрижки 2',
        duration: 122,
        lowerPrice: 200,
        topPrice: 200,
        incompatibleServicesIDs: [0],
      },
      {
        id: 2,
        title: 'Стрижка 3',
        description: 'Описание стрижки 3',
        duration: 102,
        lowerPrice: 400,
        topPrice: 700,
        incompatibleServicesIDs: [],
      }];
  },
  updateOrder(orderID) {
    axios.patch(
      'http://localhost:8080/orders',
      {
        params: {
          id: orderID,
        },
      },
    );
  },
  deleteOrder(orderID) {
    axios.delete(
      'http://localhost:8080/orders',
      {
        params: {
          id: orderID,
        },
      },
    );
  },
  sendNewOrder(infoObject) {
    axios.post('http://localhost:8080/orders', infoObject);
  },
};
