/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { masterInfoSchema } from '../../../schemas/masterInfoSchema';
import UserPhoneField from '../UserPhoneField';
import SubserviceInfoPanel from '../SubserviceInfoPanel';
import { MastersAPI } from '../../../services/MasterService';
import { addMaster } from '../../../store/AdminEntitiesSlice';

export default function AddNewMasterForm({
  isModalOpen, setModalOpen,
}) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [datetimePickerErrorMessage, setDatetimePickerErrorMessage] = React.useState(null);
  const [masterAvailableDates, setMasterAvailableDates] = React.useState([]);
  const subservices = useSelector((state) => state.adminEntities.subservices);
  const masters = useSelector((state) => state.adminEntities.masters);
  const [selectedDate, setSelectedDate] = React.useState(null);

  function handleSubmit(values) {
    if (masterAvailableDates.length === 0) {
      setErrorMessage('Выберите минимум 1 доступную дату');
      return;
    }

    if (values.providedServiceIDs.length === 0) {
      setErrorMessage('Выберите минимум 1 оказываемую услугу');
      return;
    }

    if (masters.some((el) => el.email === values.email)) {
      setErrorMessage('Этот email уже используется');
      return;
    }

    values.availableDates = masterAvailableDates;
    MastersAPI.sendNewMaster(values)
      .then(() => {
        const master = values;
        dispatch(addMaster({ master }));
        setModalOpen(false);
      })
      .catch((error) => {
        setErrorMessage(`Не удалось добавить объект: ${error.message}`);
      });
  }

  function addSelectedDateToAvailableDates() {
    if (selectedDate == null) {
      return;
    }

    const newDateTime = new Date(selectedDate.replace(/-/g, '/').replace('T', ' '));

    if (masterAvailableDates.includes(newDateTime.getTime())) {
      setDatetimePickerErrorMessage('Такая запись уже имеется в списке');
      return;
    }

    setMasterAvailableDates([...masterAvailableDates, newDateTime.getTime()]);
  }

  useEffect(() => {
    setErrorMessage(null);
    setMasterAvailableDates([]);
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
          Добавление нового мастера
        </h1>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            professionTitle: '',
            phone: '',
            email: '',
            providedServiceIDs: [],
            availableDates: [],
          }}
          validationSchema={masterInfoSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col p-2 gap-2">
              <label htmlFor="name">
                Имя
                <Field
                  name="name"
                  id="name"
                  className="input-field-special-style"
                />
                {touched.name && errors.name ? (
                  <p className="error-label">{errors.name}</p>
                ) : null}
              </label>
              <label htmlFor="surname">
                Фамилия
                <Field
                  name="surname"
                  id="surname"
                  className="input-field-special-style"
                />
                {touched.surname && errors.surname ? (
                  <p className="error-label">{errors.surname}</p>
                ) : null}
              </label>
              <label htmlFor="professionTitle">
                Название профессии/должности
                <Field
                  name="professionTitle"
                  id="professionTitle"
                  className="input-field-special-style"
                />
                {touched.professionTitle && errors.professionTitle ? (
                  <p className="error-label">{errors.professionTitle}</p>
                ) : null}
              </label>
              <label htmlFor="phone">
                Контактный телефон:
                <Field name="phone" component={UserPhoneField} />
              </label>
              <label htmlFor="email">
                Адрес электронной почты
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="input-field-special-style"
                />
                {touched.email && errors.email ? (
                  <p className="error-label">{errors.email}</p>
                ) : null}
              </label>
              <label htmlFor="providedServiceIDs">
                Список оказываемых услуг
                <Field
                  as="select"
                  name="providedServiceIDs"
                  id="providedServiceIDs"
                  className="flex flex-col border-[1px] border-gray-400 rounded-md "
                  multiple
                  size={10}
                >
                  {
                    subservices && subservices.map((subservice) => (
                      <option
                        key={subservice.id}
                        value={parseInt(subservice.id, 10)}
                      >
                        <SubserviceInfoPanel subservice={subservice} />
                      </option>
                    ))
                  }
                </Field>
                {touched.providedServiceIDs && errors.providedServiceIDs ? (
                  <p className="error-label">{errors.providedServiceIDs}</p>
                ) : null}
              </label>
              <label htmlFor="availableDates">
                Список доступных дат
                <div className="flex sm:flex-row flex-col">
                  <div
                    className="sm:w-1/2 flex flex-col gap-1 border-[1px] border-gray-300 rounded-l-xl p-2"
                  >
                    {
                      masterAvailableDates.map((date) => (
                        <div key={date} className="flex flex-row gap-5">
                          <span>{(new Date(date)).toLocaleString('ru')}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setMasterAvailableDates(
                                (prevState) => prevState.filter((el) => el !== date),
                              );
                            }}
                            className="text-red-500"
                          >
                            Удалить
                          </button>
                        </div>
                      ))
                    }
                  </div>
                  <div className="w-max border-[1px] border-l-[0px] border-gray-300 flex gap-2 flex-col justify-start items-start p-2 rounded-r-lg">
                    <h1>Выберите дату и время</h1>
                    <input type="datetime-local" name="datetime" id="datetime" onChange={(date) => setSelectedDate(date.target.value)} required />
                    <button
                      type="button"
                      className="cursor-pointer px-2 py-1 text-base bg-green-500 rounded-lg w-max text-white"
                      onClick={() => addSelectedDateToAvailableDates()}
                    >
                      Внести в список
                    </button>
                    {
                      datetimePickerErrorMessage && (
                        <span className="text-red-500">{datetimePickerErrorMessage}</span>
                      )
                    }
                  </div>
                </div>
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
                  value="Применить изменения"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

AddNewMasterForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
