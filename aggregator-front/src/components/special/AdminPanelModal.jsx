/* eslint-disable no-console */
import React, { useEffect } from 'react';
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
  actionObject,
  setOrders,
}) {
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleAction(method) {
    switch (method.toLowerCase()) {
      case 'patch':
        OrdersAPI.updateOrder(actionObject)
          .then(() => {
            setModalOpen(false);
          })
          .catch((error) => {
            setErrorMessage(`Не удалось произвести обновление: ${error.message}`);
          })
          .finally(() => {
            // stub
            setOrders(
              (prevState) => prevState.map((el) => (el.id === actionObject.id ? actionObject : el)),
            );
          });
        break;
      case 'delete':
        OrdersAPI.deleteOrder(actionObject)
          .then((response) => {
            console.log(response);
            setModalOpen(false);
          })
          .catch((error) => {
            setErrorMessage(`Не удалось произвести удаление: ${error.message}`);
          })
          .finally(() => {
            // stub
            setOrders((prevState) => prevState.filter((el) => el.id !== actionObject.id));
          });
        break;
      default:
        break;
    }
  }

  function handleModalClosing() {
    setModalOpen(false);
    setErrorMessage(null);
  }

  useEffect(() => {
    setErrorMessage(null);
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => handleModalClosing()}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="Modal relative p-2 text-gray-500 flex flex-col gap-8"
      overlayClassName="Overlay"
    >
      <div className="absolute right-0 bottom-1/2 text-gray-300 translate-y-1/2 text-[6rem] z-[0]">
        {modalIcon}
      </div>
      <div className="text-2xl text-gray-700">
        <h1>{title}</h1>
      </div>
      <div className="w-3/4 z-[1]">
        {content}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-red-400">{errorMessage}</p>
        <div className="flex justify-around items-center w-full">
          <button
            type="button"
            className="w-max p-1 px-2 text-white rounded-md shadow-xl"
            style={{ backgroundColor: actionButtonColorCode }}
            onClick={() => {
              if (actionObject.ordersInfo.map((el) => el.selectedSubservice).length === 0) {
                setErrorMessage('Не удалось произвести обновление: не выбраны услуги');
              } else { handleAction(actionMethod, actionObject.id); }
            }}
          >
            {actionButtonTitle}
          </button>
          <button
            type="button"
            className="bg-green-500 w-max p-1 px-2 text-white rounded-md shadow-xl"
            onClick={() => handleModalClosing()}
          >
            Отменить
          </button>
        </div>
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
  actionObject: PropTypes.objectOf(PropTypes.shape).isRequired,
  setOrders: PropTypes.func.isRequired,
};
AdminPanelModal.defaultProps = {
  actionButtonColorCode: '#ffefff',
  actionButtonTitle: 'Применить',
};
