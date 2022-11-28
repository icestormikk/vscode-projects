/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ServicesAPI } from '../../../services/ServicesService';
import { updateService } from '../../../store/AdminEntitiesSlice';

export default function EditServiceModal({
  isModalOpen, setModalOpen, service,
}) {
  const dispatch = useDispatch();
  const servicesInfo = useSelector((state) => state.adminEntities.services);
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (servicesInfo.map((el) => el.title).includes(event.target.serviceTitle.value)) {
      setErrorMessage('Услуга с таким названием уже существует');
      return;
    }

    const newObject = {
      id: service.id,
      title: event.target.serviceTitle.value,
      image: event.target.serviceCardImage.files[0],
    };

    ServicesAPI.updateService(newObject)
      .then(() => {
        const updatingService = newObject;
        dispatch(updateService({ updatingService }));
        setModalOpen(false);
      }).catch((error) => {
        setErrorMessage(`Не удалось провести обновление: ${error.message}`);
      });
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
          {`Изменение параметров раздела ${service.title}`}
        </h1>
        <form method="post" className="flex flex-col gap-4 p-2" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="serviceTitle">
            <p>Заголовок: </p>
            <input
              type="text"
              name="serviceTitle"
              id="serviceTitle"
              className="h-6 rounded-sm border-[1px] border-gray-300"
              defaultValue={service.title}
              placeholder={service.title}
              required
            />
          </label>
          <label htmlFor="serviceCardImageUrl">
            <p>Изображение на карточке: </p>
            <input type="file" name="serviceCardImage" id="serviceCardImage" />
            <p className="text-gray-400">
              Примечание: настоятельно рекомендуется использовать
              изображения с вертикальной ориентацией
            </p>
          </label>
          <div className="flex justify-center items-center">
            {
              errorMessage && (
                <span className="text-red-500">{errorMessage}</span>
              )
            }
          </div>
          <div className="flex justify-center items-center">
            <input type="submit" value="Применить изменения" className="cursor-pointer px-2 py-1 bg-green-500 rounded-lg w-max text-white" />
          </div>
        </form>
      </div>
    </Modal>
  );
}

EditServiceModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  service: PropTypes.objectOf(PropTypes.shape).isRequired,
};
