import axios from 'axios';
import hairWomanPictureUrl from '../static/pictures/hair_woman.jpg';
import hairManPictureUrl from '../static/pictures/hair_man.jpg';
import manicurePictureUrl from '../static/pictures/manicure.jpg';
import makeupPictureUrl from '../static/pictures/makeup.jpg';

export const defaultServices = [
  {
    id: 0,
    title: 'Женские стрижки',
    imageUrl: hairWomanPictureUrl,
  },
  {
    id: 1,
    title: 'Мужские стрижки',
    imageUrl: hairManPictureUrl,
  },
  {
    id: 2,
    title: 'Маникюр',
    imageUrl: manicurePictureUrl,
  },
  {
    id: 3,
    title: 'Макияж',
    imageUrl: makeupPictureUrl,
  },
];

export const defaultSubservices = [{
  id: 0,
  serviceID: 0,
  title: 'Стрижка 1',
  description: 'Описание стрижки 1',
  duration: 40,
  lowerPrice: 100,
  topPrice: 200,
  incompatibleServicesIDs: [1],
},
{
  id: 1,
  serviceID: 0,
  title: 'Стрижка 2',
  description: 'Описание стрижки 2',
  duration: 122,
  lowerPrice: 200,
  topPrice: 200,
  incompatibleServicesIDs: [0],
},
{
  id: 2,
  serviceID: 0,
  title: 'Стрижка 3',
  description: 'Описание стрижки 3',
  duration: 102,
  lowerPrice: 400,
  topPrice: 700,
  incompatibleServicesIDs: [],
}];

export const ServicesAPI = {
  getAllServices() {
    return axios
      .get('http://localhost:8080/services', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
  },
  getAllSubservices() {
    return axios
      .get('http://localhost:8080/subservices');
  },
  getSubservicesByServiceID(id) {
    return axios
      .get('http://localhost:8080/services', {
        params: {
          subserviceId: id > -1 ? id : 1,
        },
      });
  },
};
