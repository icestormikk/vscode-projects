/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function DateTimeChoise(
  { dateTimeCompletedController, masters, selectedSubservices },
) {
  const availableDates = [];

  return (
    <>
      <div className="flex justify-between items-center text-gray-500 ">
        <h1 className="my-4 text-2xl">Выбор времени посещения</h1>
        <h1 className="my-4 text-xl whitespace-nowrap">2 / 3</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="p-4 border-[1px] border-gray-300 overflow-hidden w-full rounded-2xl">
          <h1>Test</h1>
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
  masters: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedSubservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
