/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Field, Form, Formik } from 'formik';
import { masterInfoSchema } from '../../../schemas/masterInfoSchema';
import UserPhoneField from '../UserPhoneField';
import SubserviceInfoPanel from '../SubserviceInfoPanel';

export default function EditMasterModal({
  isModalOpen, setModalOpen, master,
}) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [masterAvailableDates, setMasterAvailableDates] = React.useState(master.availableDates);
  const subservices = useSelector((state) => state.adminEntities.subservices);

  useEffect(() => {
    setMasterAvailableDates(master.availableDates);
    setErrorMessage(null);
  }, [master]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => { setModalOpen(false); setErrorMessage(null); }}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="Modal w-1/2 relative text-gray-500 flex flex-col gap-8"
      overlayClassName="Overlay"
    >
      <div className="flex flex-col">
        <h1 className="p-2 border-b-[1px] border-b-gray-300 text-xl text-gray-700">
          {`Изменение информации о мастере ${master.name} ${master.surname}`}
        </h1>
        <Formik
          initialValues={{
            name: master.name,
            surname: master.surname,
            professionTitle: master.professionTitle,
            phone: master.phone,
            email: master.email,
            providedServiceIDs: master.providedServiceIDs,
            availableDates: master.availableDates,
          }}
          validationSchema={masterInfoSchema}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col p-2 gap-2">
              <label htmlFor="name">
                Имя
                <Field name="name" id="name" />
                {touched.name && errors.name ? (
                  <p className="error-label">{errors.name}</p>
                ) : null}
              </label>
              <label htmlFor="surname">
                Фамилия
                <Field name="surname" id="surname" />
                {touched.surname && errors.surname ? (
                  <p className="error-label">{errors.surname}</p>
                ) : null}
              </label>
              <label htmlFor="professionTitle">
                Название профессии/должности
                <Field name="professionTitle" id="professionTitle" />
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
                <Field type="email" name="email" id="email" />
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
                  multiple
                  size={10}
                >
                  {
                    subservices && subservices.map((subservice) => (
                      <option
                        key={subservice.id}
                        value={parseInt(subservice.id, 10)}
                        defaultValue={
                          subservices.filter((el) => master.providedServiceIDs.includes(el.id))
                        }
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
                <div className="flex flex-col gap-1 border-[1px] border-gray-300 rounded-xl p-2">
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
                  <button
                    type="button"
                    className="cursor-pointer text-base px-2 py-1 bg-green-500 rounded-lg w-max text-white"
                  >
                    + Добавить
                  </button>
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
        {
          errorMessage && (
            <span className="text-red-500">{errorMessage}</span>
          )
        }
      </div>
    </Modal>
  );
}

EditMasterModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  master: PropTypes.objectOf(PropTypes.shape).isRequired,
};
