/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { UsersAPI } from '../../../services/UserService';
import { logout } from '../../../store/UserInfoSlice';

export default function DeleteUserModal({
  isModalOpen, setModalOpen,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users);
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleDeleteAction() {
    const deletingUser = currentUser.userInfo;

    UsersAPI.deleteUser(deletingUser)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        setErrorMessage(`Не удалось провести операцию удаления: ${error.message}`);
        dispatch(logout());
      });
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="Modal relative text-black flex flex-col gap-8"
      overlayClassName="Overlay z-[40]"
    >
      <div className="flex flex-col">
        <h1 className="p-2 border-b-[1px] border-b-gray-300 text-xl text-gray-700">
          Удаление учётной записи
        </h1>
        <div className="p-2 flex flex-col gap-4 text-center">
          <h1>Вы действительно хотите удалить Вашу учётную запись?</h1>
          <h1 className="text-red-600 text-xl text-center">Внимание, данное действие необратимо!</h1>
        </div>
        {
          errorMessage && (
            <span className="text-red-500 text-center">{errorMessage}</span>
          )
        }
        <div className="flex flex-row justify-around items-center p-2">
          <button
            type="button"
            className="w-max px-2 py-1 rounded-lg bg-red-500 text-primary-color"
            onClick={() => handleDeleteAction()}
          >
            Удалить
          </button>
          <button
            type="button"
            className="w-max px-2 py-1 rounded-lg bg-green-500 text-primary-color"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
}

DeleteUserModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
