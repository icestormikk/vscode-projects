/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import MasterAndServiceDisplay from './MasterAndServiceDisplay';
import DateTimeContainer from './DateTimeContainer';
import { groupDatesObject, toObject } from '../../datesTransformFunctions';
import { setSubserviceDate } from '../../store/OrdersInfoSlice';
import ControllersButtonsPanel from './ControllersButtonsPanel';

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
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
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
  }, [isOneTimeMode]);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div id="dateContainer" className="p-4 border-[1px] border-gray-300 w-full rounded-2xl flex flex-col gap-2">
          <div className="flex justify-center items-center">
            <div className=" w-max bg-gray-100 rounded-xl border-[1px] border-gray-300 flex flex-row overflow-hidden">
              {
                selectedSubservices.length > 1 && (
                  <>
                    <button
                      onClick={() => setOneTimeMode(true)}
                      type="button"
                      className={`${isOneTimeMode ? 'bg-green-500/50' : 'bg-gray-200'} h-full p-2 duration-100 transition-colors`}
                    >
                      <span>Последовательно</span>
                    </button>
                    <button
                      onClick={() => { setOneTimeMode(false); }}
                      type="button"
                      className={`${!isOneTimeMode ? 'bg-green-500/50' : 'bg-gray-200'} h-full p-2 duration-100 transition-colors`}
                    >
                      <span>В разное время</span>
                    </button>
                  </>
                )
              }
            </div>
          </div>
          <MasterAndServiceDisplay
            selectedSubservices={selectedSubservices}
            subservicesToMasters={subservicesToMasters}
            masters={masters}
            showWithDateTimes={!isOneTimeMode}
            setErrorController={setIsError}
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
      <ControllersButtonsPanel
        addressToComeback="/services"
        nextStageAction={dateTimeCompletedController}
        isErrorState={isError}
      />
    </>
  );
}

DateTimeChoise.propTypes = {
  dateTimeCompletedController: PropTypes.func.isRequired,
  selectedSubservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subservicesToMasters: PropTypes.objectOf(PropTypes.shape).isRequired,
  masters: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
