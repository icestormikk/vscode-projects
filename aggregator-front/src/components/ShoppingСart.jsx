import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import Counter from './Counter';
import TimeDisplay from './special/TimeDisplay';
import { removeSubserviceFromCart } from '../store/OrdersInfoSlice';

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
  const isVisible = useSelector((state) => state.ordersInfo.isVisible);
  const selectedSubservices = useSelector((state) => state.ordersInfo.selectedSubservices);
  const statisticsElementStyle = 'statsElement flex gap-1 text-base px-4 whitespace-nowrap';

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

  function handleSubserviceDeleting(subservice) {
    dispatch(removeSubserviceFromCart({ subservice }));
    if (selectedSubservices.length === 1) { setModalOpen(false); }
  }

  return (
    <div id="#shoppingcart" className={`fixed z-20 flex flex-col sm:flex-row justify-center items-center ${isVisible ? 'bottom-0' : '-bottom-full'} left-0 w-full p-2 bg-[#dddddd] text-base text-secondary-color transition-all duration-200`}>
      <div className={statisticsElementStyle}>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="bg-[#e9e8e8] p-2 w-full absolute left-0 sm:bottom-14 bottom-[5.2rem] flex justify-center items-center">
            <div className="max-w-min">
              {
                selectedSubservices.map((subservice) => (
                  <div key={subservice.id} className="flex justify-center items-center gap-4 w-max">
                    <button type="button" onClick={() => handleSubserviceDeleting(subservice)}>
                      <AiOutlineClose className="text-red-600 font-extrabold text-xl" />
                    </button>
                    <p>{subservice.title}</p>
                    <p className="text-xl text-gray-500"> &#x2022; </p>
                    <TimeDisplay durationInMins={subservice.duration} />
                    <p className="text-xl text-gray-500"> &#x2022; </p>
                    <p>
                      {subservice.lowerPrice === subservice.topPrice
                        ? '' : `${subservice.lowerPrice} - `}
                      {subservice.topPrice}
                      {' '}
                      RUB
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        </Modal>
        <button type="button" onClick={() => setModalOpen(true)} className={statisticsElementStyle}>
          <HiOutlineShoppingBag className="text-2xl" />
          <p>{`${selectedSubservices.length} ${getRightWordForm(selectedSubservices.length)}`}</p>
        </button>
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
        <Link to="/services/order" className="text-base text-gray-100 py-2 px-4 rounded-xl bg-gradient-to-r from-[#029872] to-[#09b68b] mt-2 sm:my-0">
          <p>Продолжить</p>
        </Link>
      </div>
    </div>
  );
}
