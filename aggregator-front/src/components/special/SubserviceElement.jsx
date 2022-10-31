/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addSubserviceToCart } from '../../store/ShoppingCartSlice';
import SubserviceCounter from './SubserviceCounter';

const MINUTES_IN_HOUR = 60;

export default function SubserviceElement({ subservice }) {
  const dispatch = useDispatch();
  const allSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);
  const currentSubserviceCount = allSubservices.filter((elem) => elem.id === subservice.id).length;

  return (
    <div className="text-xl flex justify-between items-center bg-gray-600 duration-100 p-2 rounded-lg h-max transition-all">
      <div>
        <h2>{subservice.title}</h2>
        <p className="font-light max-w-3xl break-words">
          {subservice.description}
        </p>
        <div className="flex flex-row justify-start items-center gap-2 sm:text-base xl:text-xl">
          <p className="h-max">
            {subservice.lowerPrice === subservice.topPrice
              ? '' : `${subservice.lowerPrice} - `}
            {subservice.topPrice}
            {' '}
            RUB
          </p>
          <p className="text-2xl text-gray-300"> &#x2022; </p>
          <p>
            {parseInt(
              subservice.duration / MINUTES_IN_HOUR,
              10,
            ) > 0
              ? `${parseInt(
                subservice.duration / MINUTES_IN_HOUR,
                10,
              )} ч `
              : ''}
            {parseInt(
              subservice.duration % MINUTES_IN_HOUR,
              10,
            )}
            {' '}
            мин
          </p>
        </div>
      </div>
      <div>
        {currentSubserviceCount > 0
          ? <SubserviceCounter subservice={subservice} count={currentSubserviceCount} />
          : (
            <button
              type="button"
              className="bg-gray-500 hover:bg-green-500 transition-colors duration-100 py-2 px-4 rounded-lg"
              onClick={() => { dispatch(addSubserviceToCart({ subservice })); }}
            >
              Выбрать
            </button>
          )}
      </div>
    </div>
  );
}

SubserviceElement.propTypes = {
  subservice: PropTypes.objectOf(PropTypes.shape).isRequired,
};
