import axios from 'axios';
import { defaultMasters } from './MasterService';
import { defaultSubservices } from './ServicesService';

export const defaultOrders = [{
  id: 0,
  selectedSubservices: [
    defaultSubservices[0],
    defaultSubservices[1],
  ],
  masterInfo: defaultMasters[1],
  clientInfo: {
    name: 'Александра',
    surname: 'Королёва',
    phone: '8-800-555-35-35',
  },
  clientCommentary: 'Комментарий клиента',
  date: new Date(2022, 10, 24, 15, 20),
  totalLowerPrice: defaultSubservices[0].lowerPrice + defaultSubservices[0].lowerPrice,
  totalTopPrice: defaultSubservices[1].topPrice + defaultSubservices[1].topPrice,
},
{
  id: 1,
  selectedSubservices: [
    defaultSubservices[1],
    defaultSubservices[2],
  ],
  masterInfo: defaultMasters[2],
  clientInfo: {
    name: 'Юрий',
    surname: 'Королев',
    phone: '8-800-555-35-36',
  },
  clientCommentary: '',
  date: new Date(2022, 10, 24, 16, 20),
  totalLowerPrice: defaultSubservices[1].lowerPrice + defaultSubservices[1].lowerPrice,
  totalTopPrice: defaultSubservices[2].topPrice + defaultSubservices[2].topPrice,
},
{
  id: 2,
  selectedSubservices: [
    defaultSubservices[2],
  ],
  masterInfo: defaultMasters[1],
  clientInfo: {
    name: 'Фатима',
    surname: 'Колесникова',
    phone: '8-800-555-35-37',
  },
  clientCommentary: '',
  date: new Date(2022, 10, 27, 10),
  totalLowerPrice: defaultSubservices[2].lowerPrice + defaultSubservices[2].lowerPrice,
  totalTopPrice: defaultSubservices[2].topPrice + defaultSubservices[2].topPrice,
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
