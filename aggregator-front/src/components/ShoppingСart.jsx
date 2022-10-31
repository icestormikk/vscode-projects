/* eslint-disable react/no-unused-class-component-methods */
import React from 'react';
import { useSelector } from 'react-redux';
// import Counter from './Counter';

export default function ShoppingСart() {
  const selectedSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);

  return (
    <div className={`fixed flex justify-center items-center ${selectedSubservices.length > 0 ? 'bottom-0' : '-bottom-20'} left-0 w-full p-4 bg-[#dddddd] text-2xl text-secondary-color transition-all duration-200`}>
      <p>{selectedSubservices.length}</p>
    </div>
  );
}
