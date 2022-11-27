import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { TbHandClick } from 'react-icons/tb';

export default function OurWorks() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 my-20 h-full text-gray-500 text-xl">
        <h1 id="page-title">Наши работы</h1>
        <div className="flex justify-center items-center text-center h-full flex-col gap-4 xl:text-2xl text-xl">
          <div className="sm:w-1/2 w-full">
            <p className=" mt-20">
              Для просмотра наших работ приглашаем Вас в наш аккаунт Instagram.
            </p>
            <p>
              В нём вы также сможете узнать последние новости о работе наших салонов,
              новых акциях и скидках.
            </p>
            <p className="mt-8 opacity-50">А ещё у нас есть печеньки 🍪 ;)</p>
            <div className="flex justify-center items-center">
              <AiOutlineInstagram className="text-[12rem] my-8 text-white rounded-full p-4" style={{ backgroundImage: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }} />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <span className="text-lg text-gray-400">(убедитесь, что включили VPN)</span>
              <a
                href="https://www.instagram.com/marmaladenails"
                target="blank"
                className="bg-gradient-to-r from-[#029872] to-[#09b68b] p-2 rounded-lg text-white flex flex-row text-2xl justify-center items-center gap-4 w-max"
              >
                Перейти
                <TbHandClick />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
