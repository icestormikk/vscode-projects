/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MasterAndServiceDisplay from './MasterAndServiceDisplay';
import DateTimeContainer from './DateTimeContainer';
import { groupDatesObject, toObject } from '../../datesTransformFunctions';
import { setSubserviceDate } from '../../store/OrdersInfoSlice';

export function initailizateAvailableDates(daysCount, hoursCount) {
  const datesArray = [];
  const startDate = new Date();
  for (let i = 0; i < daysCount; i += 1) {
    for (let j = 0; j < hoursCount; j += 1) {
      datesArray.push(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + i,
          (startDate.getHours() + j) % 24,
        ).getTime(),
      );
    }
  }

  return datesArray;
}

export default function DateTimeChoise(
  {
    dateTimeCompletedController, selectedSubservices, subservicesToMasters, masters,
  },
) {
  const dispatch = useDispatch();
  const [isOneTimeMode, setOneTimeMode] = React.useState(true);
  const [datesObject, setDatesObject] = React.useState(
    groupDatesObject(toObject(initailizateAvailableDates(10, 8))),
  );

  useState(() => {
    const tempDateObject = toObject(initailizateAvailableDates(10, 8));
    setDatesObject(
      groupDatesObject(
        tempDateObject,
      ),
    );
    const timestamp = tempDateObject.find((el) => el.isSelected === true).date.getTime();
    selectedSubservices.forEach((el) => {
      const subserviceId = el.id;
      dispatch(setSubserviceDate({ subserviceId, timestamp }));
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center text-gray-500 ">
        <h1 className="my-4 text-2xl">Выбор времени посещения</h1>
        <h1 className="my-4 text-xl whitespace-nowrap">2 / 3</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <div id="dateContainer" className="p-4 border-[1px] border-gray-300 w-full rounded-2xl flex flex-col gap-2">
          <div className="flex justify-center items-center">
            <div className=" w-max bg-gray-100 rounded-xl border-[1px] border-gray-300 flex flex-row overflow-hidden">
              <button
                onClick={() => setOneTimeMode(true)}
                type="button"
                className={`${isOneTimeMode ? 'bg-green-300' : 'bg-gray-200'} h-full p-2 duration-100 transition-colors`}
              >
                <span>Последовательно</span>
              </button>
              <button
                onClick={() => setOneTimeMode(false)}
                type="button"
                className={`${!isOneTimeMode ? 'bg-green-300' : 'bg-gray-200'} h-full p-2 duration-100 transition-colors`}
              >
                <span>В разное время</span>
              </button>
            </div>
          </div>
          <MasterAndServiceDisplay
            selectedSubservices={selectedSubservices}
            subservicesToMasters={subservicesToMasters}
            masters={masters}
            showWithDateTimes={!isOneTimeMode}
          />
          {isOneTimeMode && (
            <div id="dateContainer" className="flex flex-col gap-2">
              <DateTimeContainer
                initialDates={datesObject}
                relatedSubservices={selectedSubservices}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <Link to="/services">
          <div className="bg-gradient-to-l from-[#e45353] to-[#e91f1f] p-2 text-base rounded-lg text-white">
            Вернуться
          </div>
        </Link>
        <button
          type="button"
          className="bg-gradient-to-r from-[#029872] to-[#09b68b] text-base p-2 rounded-lg text-white"
          onClick={dateTimeCompletedController}
        >
          Продолжить
        </button>
      </div>
    </>
  );
}

DateTimeChoise.propTypes = {
  dateTimeCompletedController: PropTypes.func.isRequired,
  selectedSubservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subservicesToMasters: PropTypes.objectOf(PropTypes.shape).isRequired,
  masters: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
