import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-screen">
        <div className="flex sm:flex-row h-full flex-col justify-center items-center gap-4 text-gray-600">
          <h1 className="text-[6rem]">404</h1>
          <div className="flex flex-col text-gray-500 text-2xl w-5/6 xl:w-1/2">
            <span>Упс, похоже в обратились к несуществующей странице..</span>
            <div className="flex gap-2 font-light">
              <span>
                Пожалуйста, вернитесь на
                {' '}
                <Link to="/" className="underline">
                  главную страницу
                </Link>
                {' '}
                или воспользуйтесь панелью навигации вверху страницы
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
