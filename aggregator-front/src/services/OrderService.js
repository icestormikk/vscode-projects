import axios from 'axios';

export const defaultOrders = [{
  id: 0,
  serviceInfo: {
    id: 0,
    title: 'Услуга N1',
  },
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
  serviceInfo: {
    id: 1,
    title: 'Услуга N2',
  },
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
  service: {
    id: 2,
    title: 'Услуга N3',
  },
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

export const defaultSubservices = [{
  id: 0,
  title: 'Стрижка 1',
  description: 'Описание стрижки 1',
  duration: 40,
  lowerPrice: 100,
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

export const OrdersAPI = {
  getAllOrders() {
    return axios
      .get('http://localhost:8080/orders');
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
    return axios.delete(
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
