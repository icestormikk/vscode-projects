/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SubserviceInfoPanel from './SubserviceInfoPanel';

Modal.setAppElement('#root');

export default function AddServiceInOrderModal({
  isOpen, setIsOpen, services, subservices, onAdd,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="Modal p-2 text-xl"
      overlayClassName="Overlay"
    >
      <h1>Выберите услугу</h1>
      <div className="border-[1px] border-gray-400 rounded-xl p-2 mt-3 shadow-xl">
        {
          services.map((elem) => (
            <div key={elem.id} className="text-lg">
              <h1>{elem.title}</h1>
              <div className="ml-10 flex flex-col gap-1 text-gray-500 w-max font-light">
                {
                  subservices.filter(
                    (el) => elem.id === el.serviceID,
                  ).map((el) => (
                    <button
                      key={el.id}
                      type="button"
                      className="hover:bg-gray-200 px-2 bg-white flex justify-start"
                      onClick={() => {
                        onAdd(el);
                        setIsOpen(false);
                      }}
                    >
                      <SubserviceInfoPanel subservice={el} />
                    </button>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </Modal>
  );
}

AddServiceInOrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  services: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onAdd: PropTypes.func.isRequired,
};
