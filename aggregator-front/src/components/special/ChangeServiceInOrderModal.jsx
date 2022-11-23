/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SubserviceInfoPanel from './SubserviceInfoPanel';

Modal.setAppElement('#root');

export default function ChangeServiceInOrderModal({
  subservice, serviceIndex, services, subservices, onReplace, onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-row gap-8">
        {subservice.title}
        <button type="button" className="text-green-600" onClick={() => setIsModalOpen(true)}>Заменить</button>
        <button type="button" className="text-red-600" onClick={() => onDelete()}>Удалить</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
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
                          onReplace(serviceIndex, el);
                          setIsModalOpen(false);
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
    </>
  );
}

ChangeServiceInOrderModal.propTypes = {
  subservice: PropTypes.objectOf(PropTypes.shape).isRequired,
  serviceIndex: PropTypes.number.isRequired,
  services: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onReplace: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
