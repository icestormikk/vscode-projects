import React from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Counter from './Counter';
import TimeDisplay from './special/TimeDisplay';
import ModalWindow from './special/ModalWindow';

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
  const isVisible = useSelector((state) => state.shoppingCart.isVisible);
  const selectedSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);
  const statisticsElementStyle = 'statsElement flex gap-1 sm:text-xl text-base px-4 whitespace-nowrap';

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
    <div id="#shoppingcart" className={`fixed z-20 flex flex-col sm:flex-row justify-center items-center ${isVisible ? 'bottom-0' : '-bottom-full'} left-0 w-full p-4 bg-[#dddddd] text-xl text-secondary-color transition-all duration-200`}>
      <div className={statisticsElementStyle}>
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
      <div className={statisticsElementStyle}>
        <ModalWindow />
      </div>
    </div>
  );
}
