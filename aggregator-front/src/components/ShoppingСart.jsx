/* eslint-disable react/no-unused-class-component-methods */
import React from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Counter from './Counter';

export default function ShoppingСart() {
  const selectedSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);

  return (
    <div className={`fixed z-20 flex justify-center items-center ${selectedSubservices.length > 0 ? 'bottom-0' : '-bottom-20'} left-0 w-full p-4 bg-[#dddddd] text-2xl text-secondary-color transition-all duration-200`}>
      <div className="flex gap-1 border-x-[1px] border-gray-500 px-4">
        <HiOutlineShoppingBag className="text-3xl" />
        <p>{selectedSubservices.length}</p>
      </div>
      <div className="border-x-[1px] border-gray-500 px-4">
        <Counter
          price={selectedSubservices.map(
            (elem) => elem.topPrice,
          ).reduce((partialSum, a) => partialSum + a, 0)}
        />
      </div>
    </div>
  );
}
