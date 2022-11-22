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
  getSubservicesByServiceID(id) {
    return axios
      .get('http://localhost:8080/services', {
        params: {
          subserviceId: id > -1 ? id : 1,
        },
      });
  },
};
