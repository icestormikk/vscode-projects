import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addSubserviceToCart, removeSubserviceFromCart } from '../../store/ShoppingCartSlice';

export default function SubserviceCounter({ subservice, count }) {
  const dispatch = useDispatch();

  return (
    <div className="gap-6 flex flex-row justify-center items-center text-3xl">
      <AiOutlineMinus
        className="bg-[rgb(240,105,105)] rounded-full p-2 text-black"
        onClick={() => dispatch(removeSubserviceFromCart({ subservice }))}
      />
      <p>{count}</p>
      <AiOutlinePlus
        className="bg-[rgb(105,240,112)] rounded-full p-2 text-black"
        onClick={() => dispatch(addSubserviceToCart({ subservice }))}
      />
    </div>
  );
}

SubserviceCounter.propTypes = {
  subservice: PropTypes.objectOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
};
