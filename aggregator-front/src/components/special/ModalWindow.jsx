/* eslint-disable no-unused-vars */
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { closeHeader } from '../../store/HeaderSlice';
import { hide, show } from '../../store/ShoppingCartSlice';

Modal.setAppElement('#root');

export default function ModalWindow() {
  const dispatch = useDispatch();

  const selectedSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => { setModalOpen(true); }} type="button" className="text-xl text-gray-100 py-2 px-4 rounded-xl bg-gradient-to-r from-[#029872] to-[#09b68b] mt-2 sm:my-0">
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
          <div className="flex w-full h-max justify-between items-center text-2xl text-black px-4 py-2 mb-2 border-b-[1px] border-b-gray-300">
            <p>Оформление заказа</p>
            <AiOutlineClose className="cursor-pointer bg-gray-300 hover:bg-red-400 transition-colors duration-100 p-1 text-3xl rounded-full" onClick={() => { setModalOpen(false); }} />
          </div>
        </div>
      </Modal>
    </>
  );
}
/* <button
    type="button"
    onClick={() => {
      axios.get('/api/masters', {
        params:
          { services: selectedSubservices.map((elem) => elem.id) },
      });
    }}
  >
    Send Request

  </button> */
