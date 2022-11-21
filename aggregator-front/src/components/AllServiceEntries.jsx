/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
import axios from 'axios';
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { AiFillEdit, AiOutlineFire } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-modal';
import AdminPanelModal from './special/AdminPanelModal';

Modal.setAppElement('#root');

export default function AllServiceEntries() {
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);

  const [dateValue, setDateValue] = React.useState(null);
  const [ordersInfo, setOrdersInfo] = React.useState([]);

  const [deletingServiceInfo, setDeletingServiceInfo] = React.useState({
    content: '',
    deletingServiceID: -1,
  });
  const [editServiceInfo, setEditServiceInfo] = React.useState({
    content: '',
    editServiceID: -1,
  });

  function ordersByDayCount(date) {
    return ordersInfo.filter((el) => el.date.toDateString() === date.toDateString()).length;
  }

  useState(() => {
    axios.get('http://localhost:8080/orders')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setOrdersInfo([
          {
            id: 0,
            serviceTitle: 'Услуга N1',
            masterInfo: {
              name: 'Полина',
              surname: 'Соколова',
              professionTitle: 'Мастер по ноготочкам',
            },
            clientInfo: {
              name: 'София',
              surname: 'Гаврилова',
              phone: '8-800-555-35-35',
            },
            clientCommentary: 'Комментарий клиента',
            date: new Date(2022, 10, 24, 15, 20),
          },
          {
            id: 1,
            serviceTitle: 'Услуга N2',
            masterInfo: {
              name: 'Арина',
              surname: 'Степанова',
              professionTitle: 'Профессиональный парикмахер',
            },
            clientInfo: {
              name: 'Юрий',
              surname: 'Королев',
              phone: '8-800-555-35-36',
            },
            clientCommentary: '',
            date: new Date(2022, 10, 24, 16, 20),
          },
          {
            id: 2,
            serviceTitle: 'Услуга N3',
            masterInfo: {
              name: 'Мария',
              surname: 'Соколова',
              professionTitle: 'Стажер-парикмахер',
            },
            clientInfo: {
              name: 'Фатима',
              surname: 'Колесникова',
              phone: '8-800-555-35-37',
            },
            clientCommentary: '',
            date: new Date(2022, 10, 27, 10),
          },
        ]);
      });
  }, []);

  return (
    <>
      <div className="p-2 w-full flex flex-col justify-center items-center border-b-[1px] border-b-gray-300">
        <Calendar
          onChange={(date) => setDateValue(date)}
          tileContent={({ date }) => {
            const ordersInThisDay = ordersByDayCount(date);
            return (
              <div className="py-1">
                <p>{date.getDate()}</p>
                <div className="flex justify-around">
                  {
                    ordersInThisDay > 0
                    && (
                      <p className="rounded-full flex justify-center items-center text-sm bg-red-600 text-white h-6 w-6">
                        {ordersInThisDay}
                      </p>
                    )
                  }
                </div>
              </div>
            );
          }}
          value={dateValue || new Date()}
          className="rc-style"
          locale="ru-RU"
          minDetail="month"
          minDate={new Date()}
          selectRange
          showNeighboringMonth={false}
        />
      </div>
      <div className="p-2 flex flex-col w-full gap-2 justify-start items-start">
        {
          dateValue === null
            ? (
              <h1 className="text-[#075ca4]">Выберите период</h1>
            )
            : (
              <h1 className="text-[#075ca4]">
                Все записи на период c
                {' '}
                {dateValue[0].toLocaleDateString('ru')}
                {' '}
                по
                {' '}
                {dateValue[1].toLocaleDateString('ru')}
              </h1>
            )
        }
        {
          dateValue !== null && ordersInfo.filter(
            (el) => el.date.getTime() > dateValue[0].getTime()
              && el.date.getTime() < dateValue[1].getTime(),
          ).map((elem) => (
            <div key={elem.id} className="ordered-service-panel font-light text-base border-[1px] border-gray-300 w-full xl:w-2/3 2xl:w-1/2 p-2 rounded-xl relative overflow-hidden shadow-md">
              <div className="ordered-service-controller w-max h-max text-[#075ca4] font-bold text-xl flex gap-4 p-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditServiceInfo({
                      content: `Запись на ${elem.date.toLocaleString('ru', {
                        month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
                      })}?`,
                      editServiceID: elem.id,
                    });
                    setEditModalOpen(true);
                  }}
                >
                  <AiFillEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeletingServiceInfo({
                      content: `Вы действительно хотите удалить запись на ${elem.date.toLocaleString('ru', {
                        month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
                      })}?`,
                      deletingServiceID: elem.id,
                    });
                    setDeleteModalOpen(true);
                  }}
                >
                  <BsFillTrashFill />
                </button>
              </div>
              <p className="font-normal pb-3">
                Услуга #
                {elem.id}
              </p>
              <div className="flex flex-col gap-1 ml-3">
                <span>
                  <span className="font-normal">Клиент:</span>
                  {' '}
                  {elem.clientInfo.name}
                  {' '}
                  {elem.clientInfo.surname}
                  <span className="font-normal"> - </span>
                  {' '}
                  {elem.clientInfo.phone}
                </span>
                <span>
                  <span className="font-normal">Мастер:</span>
                  {' '}
                  {elem.masterInfo.name}
                  {' '}
                  {elem.masterInfo.surname}
                </span>
                <span>
                  <span className="font-normal">Время записи: </span>
                  {elem.date.toLocaleTimeString('ru')}
                </span>
              </div>
            </div>
          ))
        }
        <AdminPanelModal
          isModalOpen={isDeleteModalOpen}
          setModalOpen={setDeleteModalOpen}
          title="Удаление записи"
          content={(<p>{deletingServiceInfo.content}</p>)}
          modalIcon={<AiOutlineFire className="text-red-300" />}
          actionButtonTitle="Удалить"
          actionButtonColorCode="#f87171"
          actionMethod="delete"
          serviceID={deletingServiceInfo.deletingServiceID}
        />
        <AdminPanelModal
          isModalOpen={isEditModalOpen}
          setModalOpen={setEditModalOpen}
          title="Изменение параметров записи"
          content={(
            <p>{editServiceInfo.content}</p>
          )}
          modalIcon={<AiFillEdit className="text-green-300" />}
          actionButtonTitle="Применить"
          actionButtonColorCode="#4ade80"
          actionMethod="patch"
          serviceID={editServiceInfo.editServiceID}
        />
      </div>
    </>
  );
}
