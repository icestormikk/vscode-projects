/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { AiFillEdit, AiOutlineClose, AiOutlineFire } from 'react-icons/ai';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { userEditInfoSchema } from '../../../schemas/userEditInfoSchema';
import { UsersAPI } from '../../../services/UserService';
import UserPhoneField from '../UserPhoneField';
import DeleteUserModal from './DeleteUserModal';

export default function EditUserModal({
  isModalOpen, setIsModalOpen,
}) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successfulMessage, setSuccessfulMessage] = React.useState(null);
  const [verificationMessage, setVerificationMessage] = React.useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isTrusted, setIsTrusted] = React.useState(false);
  const currentUser = useSelector((state) => state.users);

  function validateUser(event) {
    event.preventDefault();

    const userInfo = {
      email: currentUser.userInfo.email,
      password: event.target.password.value,
    };

    UsersAPI.verifyUser(userInfo)
      .then(() => {
        setIsTrusted(true);
      })
      .catch((error) => {
        setVerificationMessage(`Не удалось пройти аутентификацию: ${error.response ? 'Неверные данные' : 'нет доступа к серверу'}`);
      });
  }

  function handleSubmit(values) {
    const updatedValues = {};

    Object.assign(updatedValues, currentUser.userInfo);
    Object.keys(values.password !== '' ? values : currentUser.userInfo).forEach((key) => {
      updatedValues[key] = values[key] || currentUser.userInfo[key];

      if (values[key] === '') {
        delete values[key];
      }
    });
    delete updatedValues.roles;

    UsersAPI.updateUser(updatedValues)
      .then(() => {
        setSuccessfulMessage('Данные успешно обновлены');
        setErrorMessage(null);
      })
      .catch((error) => {
        setSuccessfulMessage(null);
        setErrorMessage(`Не удалось провести обновление данных: ${error.message}`);
      });
  }

  useEffect(() => {
    setIsTrusted(false);
    setVerificationMessage(null);
  }, [isModalOpen]);

  return (
    <>
      <DeleteUserModal isModalOpen={isDeleteModalOpen} setModalOpen={setDeleteModalOpen} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        className="Modal relative text-black flex flex-col gap-8"
        overlayClassName="Overlay z-[30]"
      >
        <div className="block">
          <div className="flex justify-between items-center p-2 border-b-[1px] border-b-gray-300">
            <p>Управление аккаунтом</p>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              <AiOutlineClose className="text-red-600 font-extrabold text-xl" />
            </button>
          </div>
          <div className="p-2">
            {
              !isTrusted ? (
                <form className="flex flex-col gap-2" onSubmit={(event) => validateUser(event)}>
                  <h1>Подтвердите, что вы являетесь владельцем аккаунта</h1>
                  <label htmlFor="password">
                    Пароль
                    <input type="password" name="password" id="password" className="input-field-special-style w-full" required />
                  </label>
                  {
                    verificationMessage && (
                      <span className="text-red-500 text-center">{verificationMessage}</span>
                    )
                  }
                  <input type="submit" value="Подтвердить" className="w-full p-1 bg-gradient-to-r from-[#029872] to-[#09b68b] text-white text-lg rounded-lg cursor-pointer" />
                </form>
              ) : (
                <>
                  <div className="flex flex-row gap-2 items-center text-green-700">
                    <AiFillEdit />
                    <p>Изменение информации</p>
                  </div>
                  <Formik
                    initialValues={{
                      firstname: '',
                      lastname: '',
                      phone: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={userEditInfoSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({ errors, touched }) => (
                      <Form className="flex flex-col gap-2">
                        <label htmlFor="firstname" className="flex flex-col">
                          <span>Имя</span>
                          <Field name="firstname" id="firstname" className="input-field-special-style w-full" />
                          {touched.firstname && errors.firstname ? (
                            <p className="error-label">{errors.firstname}</p>
                          ) : null}
                        </label>

                        <label htmlFor="lastname" className="flex flex-col">
                          <span>Фамилия</span>
                          <Field name="lastname" id="lastname" className="input-field-special-style w-full" />
                          {touched.lastname && errors.lastname ? (
                            <p className="error-label">{errors.lastname}</p>
                          ) : null}
                        </label>

                        <label htmlFor="email" className="flex flex-col">
                          <span>Адрес электронной почты</span>
                          <Field type="email" name="email" id="email" className="input-field-special-style w-full" />
                          {touched.email && errors.email ? (
                            <p className="error-label">{errors.email}</p>
                          ) : null}
                        </label>

                        <label htmlFor="phone">
                          <span>Контактный телефон</span>
                          <Field name="phone" component={UserPhoneField} />
                        </label>

                        <label htmlFor="password">
                          <span>Новый пароль</span>
                          <Field type="password" name="password" id="password" className="input-field-special-style w-full" />
                          {touched.password && errors.password ? (
                            <p className="error-label">{errors.password}</p>
                          ) : null}
                        </label>

                        <label htmlFor="confirmPassword">
                          <span>Повторите пароль</span>
                          <Field type="password" name="confirmPassword" id="confirmPassword" className="input-field-special-style w-full" />
                          {touched.confirmPassword && errors.confirmPassword ? (
                            <p className="error-label">{errors.confirmPassword}</p>
                          ) : null}
                        </label>

                        <div className="flex flex-col justify-center text-center mt-4 gap-2">
                          {
                            errorMessage && (
                              <span className="text-red-500">{errorMessage}</span>
                            )
                          }
                          {
                            successfulMessage && (
                              <span className="text-green-500">{successfulMessage}</span>
                            )
                          }
                          <button
                            type="submit"
                            className="w-full p-1 bg-gradient-to-r from-[#029872] to-[#09b68b] text-white text-lg rounded-lg cursor-pointer"
                          >
                            Применить изменения
                          </button>
                          <button
                            type="button"
                            className="w-full p-1 bg-gradient-to-r from-[#be0707] to-[#d10f0f] flex flex-row justify-center items-center gap-2 text-white text-lg rounded-lg cursor-pointer"
                            onClick={() => {
                              setDeleteModalOpen(true);
                            }}
                          >
                            Удалить аккаунт
                            <AiOutlineFire />
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )
            }
          </div>
        </div>
      </Modal>
    </>
  );
}

EditUserModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
