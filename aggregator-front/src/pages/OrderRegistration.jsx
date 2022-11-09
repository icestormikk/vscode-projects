/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DateTimeChoise from '../components/special/DateTimeChoise';
import MastersChoise from '../components/special/MastersChoise';
import { addMaster, addMasterToSubservice } from '../store/OrdersInfoSlice';
import masterAvatar1 from '../static/pictures/master_avatar_1.jpg';
import masterAvatar2 from '../static/pictures/master_avatar_2.jpg';
import masterAvatar3 from '../static/pictures/master_avatar_3.jpg';
import UserDataForm from '../components/special/UserDataForm';

export default function OrderRegistration() {
  const dispatch = useDispatch();
  const selectedSubservices = useSelector((state) => state.ordersInfo.selectedSubservices);
  const subservicesToMasters = useSelector((state) => state.ordersInfo.subservicesToMasters);
  const masters = useSelector((state) => state.ordersInfo.masters);

  const [isReady, setReady] = React.useState(false);
  const [isMastersCompleted, setMastersCompleted] = React.useState(false);
  const [isDateTimeCompleted, setDateTimeCompleted] = React.useState(false);

  const testMasters = [{
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
    providedServiceIDs: [0],
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
  const mastersForSubservices = [[0], [0], [1, 2]];

  function updateState() {
    setReady(false);
    selectedSubservices.forEach((chosenSubservice) => {
      axios.get('http://localhost:8080/masters', {
        params: {
          serviceId: chosenSubservice.id,
        },
      })
        .then((response) => {
          console.log('Response');
          console.log(response);
        })
        .catch((error) => {
          console.log('Error');
          console.log(error);
        })
        .finally(() => {
          console.log('finally');
          const chosenSubserviceId = chosenSubservice.id;

          mastersForSubservices[chosenSubservice.id].forEach((masterId) => {
            const master = testMasters.find((mst) => mst.id === masterId);
            dispatch(addMaster({ master }));
            dispatch(addMasterToSubservice({ chosenSubserviceId, masterId }));
          });
          setReady(true);
        });
    });
    console.log(subservicesToMasters);
  }

  useEffect(() => {
    updateState();
  }, [selectedSubservices, subservicesToMasters]);

  return (
    <div className="min-h-screen text-black flex justify-center">
      <div className="xl:w-2/5 lg:w-1/2 w-4/5">
        {isReady && (
          !isMastersCompleted ? (
            <MastersChoise
              mastersCompletedController={setMastersCompleted}
              selectedSubservices={selectedSubservices}
              subservicesToMasters={subservicesToMasters}
              masters={masters}
            />
          ) : (!isDateTimeCompleted ? (
            <DateTimeChoise
              selectedSubservices={selectedSubservices}
              subservicesToMasters={subservicesToMasters}
              masters={masters}
              dateTimeCompletedController={setDateTimeCompleted}
            />
          ) : (
            <UserDataForm />
          ))
        )}
      </div>
    </div>
  );
}
