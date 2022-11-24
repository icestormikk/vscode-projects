import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SubserviceInfoPanel from './SubserviceInfoPanel';

Modal.setAppElement('#root');

export default function ChangeServiceInOrderModal({
  subservice, subservices,
  serviceIndex, services,
  masters, selectedMaster,
  onReplaceMaster, onReplaceSubservice, onDelete,
}) {
  const [isChangingServiceModalOpen, setIsChangingServiceModalOpen] = React.useState(false);
  const [isChangingMasterModalOpen, setIsChangingMasterModalOpen] = React.useState(false);

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-row gap-8">
          {subservice.title}
          <button type="button" className="text-green-600" onClick={() => setIsChangingServiceModalOpen(true)}>Заменить</button>
          <button type="button" className="text-red-600" onClick={() => onDelete(serviceIndex)}>Удалить</button>
        </div>
        <div className="flex flex-row gap-8">
          <p>
            Мастер:
            {' '}
            {selectedMaster.name || masters[0].name}
            {' '}
            {selectedMaster.surname || masters[0].surname}
          </p>
          <button type="button" className="text-green-600" onClick={() => setIsChangingMasterModalOpen(true)}>Заменить</button>
        </div>
      </div>
      <Modal
        isOpen={isChangingServiceModalOpen}
        onRequestClose={() => setIsChangingServiceModalOpen(false)}
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
                          onReplaceSubservice(serviceIndex, el);
                          setIsChangingServiceModalOpen(false);
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
      <Modal
        isOpen={isChangingMasterModalOpen}
        onRequestClose={() => setIsChangingMasterModalOpen(false)}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        className="Modal p-2 text-xl"
        overlayClassName="Overlay"
      >
        <h1>Выберите мастера</h1>
        <div className="border-[1px] border-gray-400 rounded-xl p-2 mt-3 shadow-xl">
          {
            masters && masters.map((master) => (
              <button
                key={master.id}
                type="button"
                className="flex flex-col gap-1 text-gray-500 w-max font-light hover:bg-gray-200 px-2 bg-white"
                onClick={() => {
                  onReplaceMaster(serviceIndex, master);
                  setIsChangingMasterModalOpen(false);
                }}
              >
                {master.name}
                {' '}
                {master.surname}
              </button>
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
  masters: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedMaster: PropTypes.objectOf(PropTypes.shape).isRequired,
  onReplaceSubservice: PropTypes.func.isRequired,
  onReplaceMaster: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
