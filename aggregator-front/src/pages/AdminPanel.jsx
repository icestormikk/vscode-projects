import React from 'react';
import { AiFillSetting, AiOutlineCalendar } from 'react-icons/ai';
import AllServiceEntries from '../components/AllServiceEntries';

export default function AdminPanel() {
  const [chosenElement, setChosenElement] = React.useState(null);
  const menuItems = [
    {
      id: 0,
      title: 'Все записи',
      icon: <AiOutlineCalendar />,
      element: <AllServiceEntries />,
    },
  ];

  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-full text-gray-500">
        <h1 className="text-center text-xl pb-4">Добро пожаловать в панель администратора</h1>
        <div className="flex flex-row w-full h-max border-[1px] border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col w-1/5 border-r-[1px] border-gray-300">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full px-2 py-1 hover:bg-[#075ca4] hover:text-white transition-all duration-100 text-secondary-color text-lg flex justify-start items-center gap-1"
                onClick={() => setChosenElement(item.element)}
              >
                {item.icon}
                <h1>{item.title}</h1>
              </button>
            ))}
          </div>
          <div className="w-full h-full flex">
            {
              chosenElement === null
                ? (
                  <div className="w-full flex flex-col justify-center items-center gap-2 text-lg">
                    <AiFillSetting className="text-[5rem]" />
                    <h1>С большой силой приходит и большая ответственность..</h1>
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
