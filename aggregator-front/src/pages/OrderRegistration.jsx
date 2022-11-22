/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimeChoise from '../components/special/DateTimeChoise';
import MastersChoise from '../components/special/MastersChoise';
import { addMaster, addMasterToSubservice } from '../store/OrdersInfoSlice';
import UserDataForm from '../components/special/UserDataForm';
import { MastersAPI } from '../services/MasterService';

export default function OrderRegistration() {
  const dispatch = useDispatch();
  const selectedSubservices = useSelector((state) => state.ordersInfo.selectedSubservices);
  const subservicesToMasters = useSelector((state) => state.ordersInfo.subservicesToMasters);
  const masters = useSelector((state) => state.ordersInfo.masters);

  const [isReady, setReady] = React.useState(false);
  const [isMastersCompleted, setMastersCompleted] = React.useState(false);
  const [isDateTimeCompleted, setDateTimeCompleted] = React.useState(false);
  const [isUserFormCompleted, setUserFormCompleted] = React.useState(false);

  function updateState() {
    setReady(false);

    selectedSubservices.forEach((chosenSubservice) => {
      const chosenSubserviceId = chosenSubservice.id;
      const mastersBySelectedSubservice = MastersAPI.getMastersBySubserviceID(chosenSubserviceId);

      mastersBySelectedSubservice.forEach((master) => {
        dispatch(addMaster({ master }));
        if (master.providedServiceIDs.includes(chosenSubserviceId)) {
          const masterId = master.id;
          dispatch(addMasterToSubservice({ chosenSubserviceId, masterId }));
        }
      });
    });

    setReady(true);
  }

  function handleDateTimeCompleted() {
    setDateTimeCompleted(false);
    setUserFormCompleted(false);
  }

  function handleMastersCompleted() {
    setMastersCompleted(false);
    setDateTimeCompleted(false);
    setUserFormCompleted(false);
  }

  useEffect(() => {
    updateState();
  }, [selectedSubservices, subservicesToMasters]);

  return (
    <div className="min-h-screen text-black flex justify-center">
      <div className="xl:w-2/5 md:w-1/2 w-full px-2">
        <h1 className="flex md:gap-2 gap-0 justify-center items-center m-2 md:flex-row flex-col md:text-base text-xl">
          <button type="button" onClick={() => handleMastersCompleted()}>
            <span className="order-stages-style" style={{ color: isMastersCompleted ? 'green' : 'lightgray' }}>Выбор специалистов</span>
          </button>
          <span style={{ color: isMastersCompleted ? 'green' : 'lightgray' }}>&#x2022;</span>
          <button type="button" onClick={() => handleDateTimeCompleted()}>
            <span className="order-stages-style" style={{ color: isDateTimeCompleted ? 'green' : 'lightgray' }}>Выбор времени посещения</span>
          </button>
          <span style={{ color: isDateTimeCompleted ? 'green' : 'lightgray' }}>&#x2022;</span>
          <span className="order-stages-style" style={{ color: isUserFormCompleted ? 'green' : 'lightgray' }}>Указание контактных данных</span>
        </h1>
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
            <UserDataForm
              userFormCompletedController={setUserFormCompleted}
            />
          ))
        )}
      </div>
    </div>
  );
}
