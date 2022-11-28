import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { ServicesAPI } from '../../../services/ServicesService';
import { removeMaster, removeService, removeSubservice } from '../../../store/AdminEntitiesSlice';
import { MastersAPI } from '../../../services/MasterService';

export default function DeleteEntityModal({
  isModalOpen, setModalOpen, entity,
  modalTitle, entityTitle, entitySectionTitle,
}) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);

  function deleteObject() {
    switch (entitySectionTitle.toLowerCase()) {
      case 'services':
        ServicesAPI.deleteService(entity)
          .then(() => {
            const selectedService = entity;
            dispatch(removeService({ selectedService }));
            setModalOpen(false);
          })
          .catch((error) => {
            setErrorMessage(`Не удалось провести удаление: ${error.message}`);
          });
        break;
      case 'subservices':
        ServicesAPI.deleteSubservice(entity)
          .then(() => {
            const selectedSubservice = entity;
            dispatch(removeSubservice({ selectedSubservice }));
            setModalOpen(false);
          })
          .catch((error) => {
            setErrorMessage(`Не удалось провести удаление: ${error.message}`);
          });
        break;
      case 'masters':
        MastersAPI.deleteMaster(entity)
          .then(() => {
            const removingMaster = entity;
            dispatch(removeMaster({ removingMaster }));
            setModalOpen(false);
          })
          .catch((error) => {
            setErrorMessage(`Не удалось провести удаление: ${error.message}`);
          });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setErrorMessage(null);
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => { setModalOpen(false); setErrorMessage(null); }}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="Modal relative text-gray-500 flex flex-col gap-8"
      overlayClassName="Overlay"
    >
      <div className="flex flex-col">
        <h1 className="p-2 border-b-[1px] border-b-gray-300 text-xl text-gray-700">
          {modalTitle}
        </h1>
        <div className="p-2 flex flex-col gap-4 text-center">
          <h1>{`Вы действительно хотите удалить "${entityTitle}"?`}</h1>
          <div className="flex flex-col justify-center items-center">
            {
              errorMessage && (
                <span className="text-red-300">{errorMessage}</span>
              )
            }
            <button
              type="button"
              className="w-max px-2 py-1 rounded-lg bg-red-500 text-primary-color"
              onClick={() => deleteObject()}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

DeleteEntityModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  entity: PropTypes.objectOf(PropTypes.shape).isRequired,
  modalTitle: PropTypes.string.isRequired,
  entityTitle: PropTypes.string.isRequired,
  entitySectionTitle: PropTypes.string.isRequired,
};
