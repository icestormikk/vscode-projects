import axios from 'axios';
import { defaultMasters } from './MasterService';
import { defaultSubservices } from './ServicesService';

export const defaultOrders = [{
  id: 0,
  ordersInfo: [{
    selectedSubservice: defaultSubservices[0],
    master: defaultMasters[0],
  }, {
    selectedSubservice: defaultSubservices[1],
    master: defaultMasters[1],
  }],
  clientInfo: {
    name: 'Александра',
    surname: 'Королёва',
    phone: '8-800-555-35-35',
  },
  clientCommentary: 'Комментарий клиента',
  date: new Date(2022, 10, 29, 15, 20).getTime(),
  totalLowerPrice: defaultSubservices[0].lowerPrice + defaultSubservices[0].lowerPrice,
  totalTopPrice: defaultSubservices[1].topPrice + defaultSubservices[1].topPrice,
},
{
  id: 1,
  ordersInfo: [{
    selectedSubservice: defaultSubservices[1],
    master: defaultMasters[1],
  }, {
    selectedSubservice: defaultSubservices[2],
    master: defaultMasters[2],
  }],
  clientInfo: {
    name: 'Юрий',
    surname: 'Королев',
    phone: '8-800-555-35-36',
  },
  clientCommentary: '',
  date: new Date(2022, 10, 29, 16, 20).getTime(),
  totalLowerPrice: defaultSubservices[1].lowerPrice + defaultSubservices[1].lowerPrice,
  totalTopPrice: defaultSubservices[2].topPrice + defaultSubservices[2].topPrice,
},
{
  id: 2,
  ordersInfo: [{
    selectedSubservice: defaultSubservices[2],
    master: defaultMasters[2],
  }],
  clientInfo: {
    name: 'Фатима',
    surname: 'Колесникова',
    phone: '8-800-555-35-37',
  },
  clientCommentary: '',
  date: new Date(2022, 10, 30, 10).getTime(),
  totalLowerPrice: defaultSubservices[2].lowerPrice + defaultSubservices[2].lowerPrice,
  totalTopPrice: defaultSubservices[2].topPrice + defaultSubservices[2].topPrice,
}];

export const OrdersAPI = {
  getAllOrders() {
    return axios
      .get('http://localhost:8080/orders');
  },
  updateOrder(order) {
    // eslint-disable-next-line no-console
    console.log(order);
    return axios.patch(
      `http://localhost:8080/orders?id=${order.id}`,
      order,
    );
  },
  deleteOrder(order) {
    return axios.delete(
      'http://localhost:8080/orders',
      {
        params: {
          id: order.id,
        },
      },
    );
  },
  sendNewOrder(infoObject) {
    return axios.post(
      'http://localhost:8080/orders',
      infoObject,
    );
  },
};
