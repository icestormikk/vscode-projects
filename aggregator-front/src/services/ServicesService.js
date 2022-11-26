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

const servicesPath = 'http://localhost:8080/services';
const subservicesPath = 'http://localhost:8080/subservices';

export const ServicesAPI = {
  getAllServices() {
    return axios
      .get(`${servicesPath}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
  },
  getAllSubservices() {
    return axios
      .get(`${subservicesPath}`);
  },
  getSubservicesByServiceID(id) {
    return axios
      .get(`${servicesPath}`, {
        params: {
          subserviceId: id > -1 ? id : 1,
        },
      });
  },
  updateService(service) {
    return axios
      .patch(`${servicesPath}`, service);
  },
  updateSubservice(subservice) {
    return axios
      .patch(`${subservicesPath}`, subservice);
  },
  deleteService(service) {
    return axios
      .delete(`${servicesPath}`, {
        params: {
          id: service.id,
        },
      });
  },
  deleteSubservice(subservice) {
    return axios
      .delete(`${subservicesPath}`, {
        params: {
          id: subservice.id,
        },
      });
  },
  sendNewService(service) {
    return axios
      .post(`${servicesPath}`, service);
  },
  sendNewSubservice(subservice) {
    return axios
      .post(`${subservicesPath}`, subservice);
  },
};
