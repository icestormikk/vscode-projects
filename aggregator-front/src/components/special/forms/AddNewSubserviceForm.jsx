import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { subserviceInfoSchema } from '../../../schemas/subserviceInfoSchema';
import SubserviceInfoPanel from '../SubserviceInfoPanel';
import { ServicesAPI } from '../../../services/ServicesService';
import { addSubservice } from '../../../store/AdminEntitiesSlice';

export default function AddNewSubserviceForm({
  isModalOpen, setModalOpen, selectedServiceID,
}) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const subservices = useSelector((state) => state.adminEntities.subservices);

  function handleSubmit(values) {
    if (subservices.some((el) => el.title === values.title)) {
      setErrorMessage('Услуга с таким названием уже существует');
      return;
    }

    const newSubservice = {
      serviceID: selectedServiceID,
      ...values,
    };

    ServicesAPI.sendNewSubservice(newSubservice)
      .then(() => {
        isModalOpen(true);
      })
      .catch((error) => {
        setErrorMessage(`Не удалось добавить услугу: ${error.message}`);
      })
      .finally(() => {
        const subservice = newSubservice;
        dispatch(addSubservice({ subservice }));
        setModalOpen(false);
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
          Добавление новой услуги
        </h1>
        <Formik
          initialValues={{
            title: '',
            description: '',
            duration: 0,
            lowerPrice: 1,
            topPrice: 1,
            incompatibleServicesIDs: [],
          }}
          validationSchema={subserviceInfoSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col p-2 gap-2">
              <label htmlFor="title" className="flex flex-col">
                Название услуги
                <Field name="title" id="title" className="input-field-special-style" />
                {touched.title && errors.title ? (
                  <p className="error-label">{errors.title}</p>
                ) : null}
              </label>
              <label htmlFor="description">
                Описание
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="border-[1px] border-gray-400 rounded-md font-light text-base max-h-[8rem] w-2/3 flex flex-col"
                  maxLength={150}
                />
                {touched.description && errors.description ? (
                  <p className="error-label">{errors.description}</p>
                ) : null}
              </label>
              <label htmlFor="lowerPrice">
                Продолжительность выполнения (в минутах)
                <Field
                  type="Number"
                  name="duration"
                  id="duration"
                  className="input-field-special-style"
                  min={1}
                  step={1}
                />
                {touched.duration && errors.duration ? (
                  <p className="error-label">{errors.duration}</p>
                ) : null}
              </label>
              <label htmlFor="lowerPrice">
                Нижняя граница цены
                <Field
                  type="Number"
                  name="lowerPrice"
                  id="lowerPrice"
                  className="input-field-special-style"
                  min={1}
                  step={1}
                />
                {touched.lowerPrice && errors.lowerPrice ? (
                  <p className="error-label">{errors.lowerPrice}</p>
                ) : null}
              </label>
              <label htmlFor="topPrice">
                Верхняя граница цены
                <Field
                  type="Number"
                  name="topPrice"
                  id="topPrice"
                  className="input-field-special-style"
                  min={1}
                  step={1}
                />
                {touched.topPrice && errors.topPrice ? (
                  <p className="error-label">{errors.topPrice}</p>
                ) : null}
              </label>
              <label htmlFor="incompatibleServicesIDs">
                Выберите услуги, которые пользователь не сможет выбрать вместе с данной
                <Field
                  as="select"
                  name="incompatibleServicesIDs"
                  id="incompatibleServicesIDs"
                  className="flex flex-col border-[1px] border-gray-400 rounded-md "
                  multiple
                  size={10}
                >
                  {
                    subservices && subservices.map((el) => (
                      <option
                        key={el.id}
                        value={parseInt(el.id, 10)}
                      >
                        <SubserviceInfoPanel subservice={el} />
                      </option>
                    ))
                  }
                </Field>
                {touched.incompatibleServicesIDs && errors.incompatibleServicesIDs ? (
                  <p className="error-label">{errors.incompatibleServicesIDs}</p>
                ) : null}
              </label>
              <div className="flex flex-col justify-center items-center">
                {
                  errorMessage && (
                    <span className="text-red-500">{errorMessage}</span>
                  )
                }
                <input
                  type="submit"
                  className="cursor-pointer px-2 py-1 bg-green-500 rounded-lg w-max text-white"
                  value="Добавить"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

AddNewSubserviceForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  selectedServiceID: PropTypes.number.isRequired,
};
