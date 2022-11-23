/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { OrdersAPI } from '../../services/OrderService';

export default function AdminPanelModal({
  isModalOpen,
  setModalOpen,
  title,
  content,
  modalIcon,
  actionButtonColorCode,
  actionButtonTitle,
  actionMethod,
  serviceID,
}) {
  function handleAction(method) {
    switch (method.toLowerCase()) {
      case 'patch':
        OrdersAPI.updateOrder(serviceID);
        break;
      case 'delete':
        OrdersAPI.deleteOrder(serviceID)
          .then((response) => {
            if (response.status !== 200) {
              console.log(response);
            }
          });
        break;
      default:
        break;
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="Modal relative p-2 text-gray-500 flex flex-col gap-8"
      overlayClassName="Overlay"
    >
      <div className="absolute right-0 bottom-1/2 text-gray-300 translate-y-1/2 text-[6rem] ">
        {modalIcon}
      </div>
      <div className="text-2xl text-gray-700">
        <h1>{title}</h1>
      </div>
      <div className="w-3/4">
        {content}
      </div>
      <div className="flex justify-around items-center">
        <button
          type="button"
          className="w-max p-1 px-2 text-white rounded-md shadow-xl"
          style={{ backgroundColor: actionButtonColorCode }}
          onClick={() => handleAction(actionMethod, serviceID)}
        >
          {actionButtonTitle}
        </button>
        <button
          type="button"
          className="bg-green-500 w-max p-1 px-2 text-white rounded-md shadow-xl"
          onClick={() => setModalOpen(false)}
        >
          Отменить
        </button>
      </div>
    </Modal>
  );
}

AdminPanelModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.shape).isRequired,
  modalIcon: PropTypes.objectOf(PropTypes.shape).isRequired,
  actionButtonColorCode: PropTypes.string,
  actionButtonTitle: PropTypes.string,
  actionMethod: PropTypes.string.isRequired,
  serviceID: PropTypes.number.isRequired,
};
AdminPanelModal.defaultProps = {
  actionButtonColorCode: '#ffefff',
  actionButtonTitle: 'Применить',
};