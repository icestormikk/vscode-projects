/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { AiFillEdit, AiOutlineFire } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { defaultMasters, MastersAPI } from '../services/MasterService';
import { defaultOrders, OrdersAPI } from '../services/OrderService';
import { defaultServices, defaultSubservices, ServicesAPI } from '../services/ServicesService';
import AddServiceInOrderModal from './special/AddServiceInOrderModal';
import AdminPanelModal from './special/AdminPanelModal';
import ChangeServiceInOrderModal from './special/ChangeServiceInOrderModal';
import OrderInfoPanel from './special/OrderInfoPanel';

Modal.setAppElement('#root');

export default function AllServiceEntries() {
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);

  const [dateValue, setDateValue] = React.useState(null);
  const [ordersInfo, setOrdersInfo] = React.useState([]);
  const [masters, setMasters] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [subservices, setSubservices] = React.useState([]);

  const [deletingOrderInfo, setDeletingOrderInfo] = React.useState({
    content: '',
    deletingOrder: {},
  });
  const [editOrderInfo, setEditOrderInfo] = React.useState({
    content: '',
    editingOrder: {},
  });

  function ordersByDayCount(date) {
    return ordersInfo.filter(
      (el) => new Date(el.date).toDateString() === new Date(date).toDateString(),
    ).length;
  }

  function updateEditingOrder(newEditingOrder) {
    setEditOrderInfo((prevState) => ({
      content: prevState.content,
      editingOrder: newEditingOrder,
    }));
  }

  function addSelectedSubservice(newSelectedSubservice) {
    if (editOrderInfo.editingOrder.ordersInfo.length
      < process.env.REACT_APP_SHOPPING_CART_LIMIT) {
      editOrderInfo.editingOrder.ordersInfo.push({
        selectedSubservice: newSelectedSubservice,
        master: masters.filter((master) => master.providedServiceIDs
          .includes(newSelectedSubservice.id))[0],
      });

      updateEditingOrder(editOrderInfo.editingOrder);
    }
  }

  function replaceSelectedSubservice(replacingItemIndex, newObject) {
    editOrderInfo.editingOrder
      .ordersInfo[replacingItemIndex].selectedSubservice = newObject;
    updateEditingOrder(editOrderInfo.editingOrder);
  }

  function deleteSelectedSubservice(deletingItemIndex) {
    editOrderInfo.editingOrder.ordersInfo.splice(deletingItemIndex, 1);
    updateEditingOrder(editOrderInfo.editingOrder);
  }

  function replaceSelectedMaster(replacingItemIndex, newMaster) {
    editOrderInfo.editingOrder
      .ordersInfo[replacingItemIndex].master = newMaster;
    updateEditingOrder(editOrderInfo.editingOrder);
  }

  useState(() => {
    MastersAPI.getAllMasters()
      .then((response) => {
        setMasters(response.data);
      })
      .catch(() => {
        setMasters(defaultMasters);
      });

    OrdersAPI.getAllOrders()
      .then((response) => {
        setOrdersInfo(response.data);
      })
      .catch(() => {
        setOrdersInfo(defaultOrders);
      });

    ServicesAPI.getAllServices()
      .then((response) => {
        setServices(response.data);
      })
      .catch(() => {
        setServices(defaultServices);
      });

    ServicesAPI.getAllSubservices()
      .then((response) => {
        setSubservices(response.data);
      })
      .catch(() => {
        setSubservices(defaultSubservices);
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
            (el) => el.date > dateValue[0].getTime()
              && el.date < dateValue[1].getTime(),
          ).map((elem) => (
            <div key={elem.id} className="ordered-service-panel font-light text-base border-[1px] border-gray-300 w-full xl:w-2/3 2xl:w-1/2 p-2 rounded-xl relative overflow-hidden shadow-md">
              <div className="ordered-service-controller w-max h-max text-[#075ca4] font-bold text-xl flex gap-4 p-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditOrderInfo({
                      content: `Запись на ${new Date(elem.date).toLocaleString('ru', {
                        month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
                      })}`,
                      editingOrder: JSON.parse(JSON.stringify(elem)),
                    });
                    setEditModalOpen(true);
                  }}
                >
                  <AiFillEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeletingOrderInfo({
                      content: `Вы действительно хотите удалить запись на ${new Date(elem.date).toLocaleString('ru', {
                        month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
                      })}?`,
                      deletingOrder: elem,
                    });
                    setDeleteModalOpen(true);
                  }}
                >
                  <BsFillTrashFill />
                </button>
              </div>
              <p className="font-normal pb-3">
                Запись #
                {elem.id}
              </p>
              <OrderInfoPanel order={elem} />
            </div>
          ))
        }
        <AdminPanelModal
          isModalOpen={isDeleteModalOpen}
          setModalOpen={setDeleteModalOpen}
          title="Удаление записи"
          content={(
            <p>{deletingOrderInfo.content}</p>
          )}
          modalIcon={<AiOutlineFire />}
          actionButtonTitle="Удалить"
          actionButtonColorCode="#f87171"
          actionMethod="delete"
          actionObject={deletingOrderInfo.deletingOrder}
          setOrders={setOrdersInfo}
        />
        <AdminPanelModal
          isModalOpen={isEditModalOpen}
          setModalOpen={setEditModalOpen}
          title="Изменение параметров записи"
          content={(
            <>
              <p className="text-xl">{editOrderInfo.content}</p>
              <form action="" method="get" className="mt-4">
                <span>Управление списком услуг: </span>
                <div className="ml-10">
                  {
                    editOrderInfo.editingOrder.ordersInfo
                    && editOrderInfo.editingOrder.ordersInfo.map(
                      (order, index) => (
                        <ChangeServiceInOrderModal
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          subservice={order.selectedSubservice}
                          serviceIndex={index}
                          services={services}
                          subservices={subservices.filter(
                            (el) => (
                              !editOrderInfo.editingOrder.ordersInfo
                                .map((elem) => elem.selectedSubservice.id).includes(el.id)
                              || el.id === order.selectedSubservice.id
                            ),
                          )}
                          masters={
                            masters.filter((master) => master.providedServiceIDs
                              .includes(order.selectedSubservice.id))
                          }
                          selectedMaster={order.master}
                          onReplaceMaster={replaceSelectedMaster}
                          onReplaceSubservice={replaceSelectedSubservice}
                          onDelete={deleteSelectedSubservice}
                        />
                      ),
                    )
                  }
                  {
                    editOrderInfo.editingOrder.ordersInfo
                      && editOrderInfo.editingOrder.ordersInfo.map(
                        (el) => el.selectedSubservice,
                      ).length >= process.env.REACT_APP_SHOPPING_CART_LIMIT ? (
                        <i>Добавлено максимальное кол-во услуг</i>
                      ) : (
                        <button
                          type="button"
                          className="px-2 py-[0.125rem] text-white text-base my-2 rounded-sm bg-green-400"
                          onClick={() => setAddModalOpen(true)}
                        >
                          Добавить +
                        </button>
                      )
                  }
                  {
                    editOrderInfo.editingOrder.ordersInfo && (
                      <AddServiceInOrderModal
                        isOpen={isAddModalOpen}
                        setIsOpen={setAddModalOpen}
                        services={services}
                        subservices={subservices.filter(
                          (el) => (
                            !editOrderInfo.editingOrder.ordersInfo
                              .map((elem) => elem.selectedSubservice.id).includes(el.id)
                          ),
                        )}
                        onAdd={addSelectedSubservice}
                      />
                    )
                  }
                </div>
              </form>
            </>
          )}
          modalIcon={<AiFillEdit />}
          actionButtonTitle="Применить"
          actionButtonColorCode="#4ade80"
          actionMethod="patch"
          actionObject={editOrderInfo.editingOrder}
          setOrders={setOrdersInfo}
        />
      </div>
    </>
  );
}
