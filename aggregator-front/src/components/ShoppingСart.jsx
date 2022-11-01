/* eslint-disable react/no-unused-class-component-methods */
import React from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Counter from './Counter';
import TimeDisplay from './special/TimeDisplay';

function getRightWordForm(number) {
  if (number <= 20) {
    if (number === 1) return 'услуга';
    if (number > 4) return 'услуг';
    return 'услуги';
  }
  if (number % 10 === 1) return 'услуга';
  if (number % 10 > 4 || number % 10 === 0) return 'услуг';
  return 'услуги';
}

export default function ShoppingСart() {
  const selectedSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);
  const statisticsElementStyle = 'flex gap-1 border-x-[1px] border-gray-500 px-4';

  const lowerTotalPrice = selectedSubservices.map(
    (elem) => elem.lowerPrice,
  ).reduce((partialSum, a) => partialSum + a, 0);
  const topTotalPrice = selectedSubservices.map(
    (elem) => elem.topPrice,
  ).reduce((partialSum, a) => partialSum + a, 0);

  const totalDuration = selectedSubservices.map(
    (elem) => elem.duration,
  ).reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className={`fixed z-20 flex justify-center items-center ${selectedSubservices.length > 0 ? 'bottom-0' : '-bottom-20'} left-0 w-full p-4 bg-[#dddddd] text-2xl text-secondary-color transition-all duration-200`}>
      <div className={statisticsElementStyle}>
        <HiOutlineShoppingBag className="text-3xl" />
        <p>{`${selectedSubservices.length} ${getRightWordForm(selectedSubservices.length)}`}</p>
      </div>
      <div className={statisticsElementStyle}>
        <Counter
          counterId="lowerPrice"
          trackedValue={lowerTotalPrice}
        />
        {lowerTotalPrice !== topTotalPrice && (
          <>
            <p> - </p>
            <Counter
              counterId="topPrice"
              trackedValue={topTotalPrice}
            />
          </>
        )}
        <p>RUB</p>
      </div>
      <div className={statisticsElementStyle}>
        <TimeDisplay durationInMins={totalDuration} />
      </div>
    </div>
  );
}
