import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ServicesAPI } from '../../../services/ServicesService';
import { addService } from '../../../store/AdminEntitiesSlice';

export default function AddNewServiceForm({
  isModalOpen, setModalOpen,
}) {
  const dispatch = useDispatch();
  const servicesInfo = useSelector((state) => state.adminEntities.services);
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (servicesInfo.some((el) => el.title === event.target.serviceTitle.value)) {
      setErrorMessage('Раздел с таким названием уже существует!');
      return;
    }

    const newService = {
      title: event.target.serviceTitle.value,
      image: event.target.serviceCardImage.files[0],
    };

    ServicesAPI.sendNewService(event.target)
      .then(() => {
        setModalOpen(false);
      })
      .catch((error) => {
        setErrorMessage(`Не удалось добавить раздел: ${error.message}`);
      })
      .finally(() => {
        // stub
        dispatch(addService({ newService }));
        setModalOpen(false);
      });
  }

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
          Добавление нового раздела
        </h1>
        <form method="post" className="flex flex-col gap-4 p-2" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="serviceTitle">
            <p>Заголовок: </p>
            <input
              type="text"
              name="serviceTitle"
              id="serviceTitle"
              className="h-6 rounded-sm border-[1px] border-gray-300"
              placeholder="Введите название услуги"
              required
            />
          </label>
          <label htmlFor="serviceCardImageUrl">
            <p>Изображение на карточке: </p>
            <input type="file" name="serviceCardImage" id="serviceCardImage" required />
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

AddNewServiceForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
