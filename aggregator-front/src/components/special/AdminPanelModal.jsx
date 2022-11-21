import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import axios from 'axios';

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
        axios.patch(
          'http://localhost:8080/orders',
          {
            params: {
              id: serviceID,
            },
          },
        );
        break;
      case 'delete':
        axios.delete(
          'http://localhost:8080/orders',
          {
            params: {
              id: serviceID,
            },
          },
        );
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
      <div className="absolute right-0 bottom-1/2  translate-y-1/2 text-[6rem] ">
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
          className="w-max p-1 px-2 text-white rounded-md shadow-xl hover:scale-[0.95] transition-all duration-75"
          style={{ backgroundColor: actionButtonColorCode }}
          onClick={() => handleAction(actionMethod, serviceID)}
        >
          {actionButtonTitle}
        </button>
        <button
          type="button"
          className="bg-green-400 w-max p-1 px-2 text-white rounded-md shadow-xl hover:scale-[0.95] transition-all duration-75"
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
