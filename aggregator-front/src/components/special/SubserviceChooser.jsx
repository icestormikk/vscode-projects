import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ImCheckmark } from 'react-icons/im';
import { removeSubserviceFromCart } from '../../store/ShoppingCartSlice';

export default function SubserviceChooser({ subservice }) {
  const dispatch = useDispatch();

  return (
    <div className="absolute w-full h-full text-base bg-green-600/40 top-0 left-0 flex sm:flex-row flex-col justify-between items-center p-2">
      <div className="w-1/3" />
      <div className="w-1/3 text-center flex justify-center items-center gap-2">
        <p>Выбрано</p>
        <ImCheckmark />
      </div>
      <div className="w-1/3 flex sm:justify-end justify-center items-center">
        <button
          type="button"
          className="bg-[#d64e52] text-gray-200 py-2 px-4 rounded-lg flex items-center"
          onClick={() => { dispatch(removeSubserviceFromCart({ subservice })); }}
        >
          <p>Отменить</p>
        </button>
      </div>
    </div>
  );
}

SubserviceChooser.propTypes = {
  subservice: PropTypes.objectOf(PropTypes.shape).isRequired,
};
