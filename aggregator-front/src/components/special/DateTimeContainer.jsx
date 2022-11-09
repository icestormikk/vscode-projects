/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSubserviceDate } from '../../store/OrdersInfoSlice';

function getSelectedDateFrom(datesArrayObject) {
  console.log(datesArrayObject);
  const selectedDateKey = Object.keys(datesArrayObject).find(
    (key) => datesArrayObject[key].isSelected === true,
  );
  console.log(datesArrayObject[selectedDateKey]);
  return datesArrayObject[selectedDateKey];
}

export default function DateTimeContainer({ initialDates, relatedSubservices }) {
  const dispatch = useDispatch();
  const [availableDates, setAvailableDates] = React.useState(initialDates);
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    getSelectedDateFrom(initialDates).timestamps.find(
      (el) => el.isSelected === true,
    ).date,
  );
  const sectionStyle = 'border-[1px] border-gray-300 rounded-xl p-2 flex flex-row flex-wrap justify-start gap-2';

  function selectDay(day) {
    const newDatesObject = {};

    Object.keys(availableDates).forEach((key) => {
      newDatesObject[key] = {
        timestamps: availableDates[key].timestamps,
        isSelected: key === day.toDateString(),
      };
    });

    setAvailableDates(newDatesObject);
  }

  function selectTime(time) {
    availableDates[time.toDateString()].timestamps.find((el) => el.date === time).isSelected = true;
    const newDatesObject = {};

    Object.keys(availableDates).forEach((key) => {
      newDatesObject[key] = {
        timestamps: availableDates[key].timestamps.map(
          (timestamp) => ({ date: timestamp.date, isSelected: timestamp.date === time }),
        ),
        isSelected: availableDates[key].isSelected,
      };
    });

    setAvailableDates(newDatesObject);
    setSelectedDateTime(time);
    relatedSubservices.forEach((subservice) => {
      const subserviceId = subservice.id;
      const timestamp = time.getTime();
      dispatch(setSubserviceDate({ subserviceId, timestamp }));
    });
  }

  useState(() => {
    console.log('test');
    const firstSelectedTime = Object.keys(initialDates).find(
      (key) => initialDates[key].isSelected === true,
    );
    const time = initialDates[firstSelectedTime].timestamps.find(
      (el) => el.isSelected,
    ).date.getTime();
    relatedSubservices.forEach((subservice) => {
      const subserviceId = subservice.id;
      const timestamp = time;
      dispatch(setSubserviceDate({ subserviceId, timestamp }));
    });
  }, []);

  return (
    <>
      <div className={sectionStyle}>
        {
          Object.keys(availableDates).map((key) => {
            const dayInfo = availableDates[key];
            const day = new Date(key);
            return (
              <button
                key={day.getTime()}
                onClick={() => {
                  selectDay(day);
                }}
                type="button"
                className={`w-max h-max p-2 rounded-xl text-center text-sm border-[1px] border-gray-300 ${dayInfo.isSelected ? 'bg-blue-400' : 'bg-white'} ${dayInfo.isSelected ? 'text-white' : ''}`}
              >
                <div className="flex flex-row gap-1 justify-center items-center">
                  <span className="text-base">
                    {day.getDate()}
                    {' '}
                  </span>
                  <span className="text-base" style={{ color: day.getDay() % 6 === 0 && !dayInfo.isSelected ? 'red' : '' }}>{day.toLocaleString('ru', { weekday: 'short' })}</span>
                </div>
                <p>{day.toLocaleString('ru', { month: 'short' })}</p>
              </button>
            );
          })
        }
      </div>
      <div className={sectionStyle}>
        {
          getSelectedDateFrom(availableDates).timestamps.map((time) => (
            <button
              key={time.date.getTime()}
              onClick={() => selectTime(time.date)}
              type="button"
              className={`border-[1px] border-gray-300 p-1 rounded-md ${time.isSelected ? 'bg-blue-400 text-white' : 'bg-white'}`}
            >
              <p>
                {time.date.toLocaleString('ru', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </button>
          ))
        }
      </div>
      <div className="text-base text-gray-500 text-center">
        <h1>
          Вы собираетесь записаться на:
          {' '}
          {selectedDateTime.toLocaleDateString('ru', {
            day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric',
          })}
        </h1>
      </div>
    </>
  );
}

DateTimeContainer.propTypes = {
  initialDates: PropTypes.objectOf(PropTypes.shape).isRequired,
  relatedSubservices: PropTypes.arrayOf(PropTypes.shape),
};

DateTimeContainer.defaultProps = {
  relatedSubservices: [],
};
