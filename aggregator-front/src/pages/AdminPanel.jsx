/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { AiFillSetting, AiOutlineCalendar } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import AllOrderEntries from '../components/AllOrderEntries';
import AllServiceEntries from '../components/AllServiceEntries';
import { defaultMasters, MastersAPI } from '../services/MasterService';
import { defaultOrders, OrdersAPI } from '../services/OrderService';
import { defaultServices, defaultSubservices, ServicesAPI } from '../services/ServicesService';
import { setMasters, setServices, setSubservices } from '../store/AdminEntitiesSlice';

export default function AdminPanel() {
  const dispatch = useDispatch();
  const [chosenElement, setChosenElement] = React.useState(null);

  const [ordersInfo, setOrdersInfo] = React.useState([]);

  const menuItems = [
    {
      id: 0,
      title: 'Все записи',
      icon: <AiOutlineCalendar className="text-3xl" />,
      element: <AllOrderEntries orders={ordersInfo} />,
    },
    {
      id: 1,
      title: 'Управление услугами',
      icon: <BiImageAdd className="text-3xl" />,
      element: <AllServiceEntries />,
    },
  ];

  useState(() => {
    MastersAPI.getAllMasters()
      .then((response) => {
        const masters = response.data;
        dispatch(setMasters({ masters }));
      })
      .catch(() => {
        const masters = defaultMasters;
        dispatch(setMasters({ masters }));
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
        const services = response.data;
        dispatch(setServices(services));
      })
      .catch(() => {
        const services = defaultServices;
        dispatch(setServices({ services }));
      });

    ServicesAPI.getAllSubservices()
      .then((response) => {
        const subservices = response.data;
        dispatch(setSubservices({ subservices }));
      })
      .catch(() => {
        const subservices = defaultSubservices;
        dispatch(setSubservices({ subservices }));
      });
  }, []);

  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-full text-gray-500 flex items-center flex-col">
        <h1 className="text-center text-3xl pb-4">Добро пожаловать в панель администратора</h1>
        <div className="flex flex-col w-11/12 min-h-[14rem] border-[1px] border-gray-300 rounded-lg shadow-lg overflow-hidden mb-4">
          <div className="flex sm:flex-row flex-col w-full border-b-[1px] border-gray-300">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="admin-panel-menu"
                onClick={() => setChosenElement(item.element)}
              >
                {item.icon}
                <h1>{item.title}</h1>
              </button>
            ))}
          </div>
          <div className="w-full h-full flex flex-col">
            {
              chosenElement === null
                ? (
                  <div className="w-full flex flex-col justify-center items-center gap-2 text-lg h-80">
                    <AiFillSetting className="text-[5rem]" />
                    <h1 className="text-center">С большой силой приходит и большая ответственность</h1>
                  </div>
                )
                : chosenElement
            }
          </div>
        </div>
      </div>
    </div>
  );
}
