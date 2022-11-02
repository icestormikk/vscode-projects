/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import Counter from './Counter';
import TimeDisplay from './special/TimeDisplay';
import { closeHeader } from '../store/HeaderSlice';
import { hide, show } from '../store/ShoppingCartSlice';

Modal.setAppElement('#root');

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
  const dispatch = useDispatch();
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

  const [isModalOpen, setModalOpen] = React.useState(false);

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
        <button onClick={() => { setModalOpen(true); console.log(isModalOpen); }} type="button" className="text-xl text-gray-100 py-2 px-4 rounded-xl bg-gradient-to-r from-[#029872] to-[#09b68b] mt-2 sm:my-0">
          <p>Продолжить</p>
        </button>
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={() => {
            dispatch(closeHeader());
            dispatch(hide());
          }}
          onAfterClose={() => {
            dispatch(show());
          }}
          onRequestClose={() => { setModalOpen(false); }}
          contentLabel="Minimal Modal Example"
          overlayClassName="Overlay"
          className="Modal"
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
        >
          <div>
            <div className="flex w-full h-max justify-between items-center text-2xl text-black px-4 py-2 border-b-[1px] border-b-gray-400">
              <p>Оформление заказа</p>
              <AiOutlineClose onClick={() => { setModalOpen(false); }} />
              <button
                type="button"
                onClick={() => {
                  axios.get('/api/masters', {
                    params:
                      { services: selectedSubservices.map((elem) => elem.id) },
                  });
                }}
              >
                Send Request

              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
