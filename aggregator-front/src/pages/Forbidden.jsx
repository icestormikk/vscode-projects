import React from 'react';
import { Link } from 'react-router-dom';

export default function Forbidden() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-screen">
        <div className="flex sm:flex-row h-full flex-col justify-center items-center gap-4 text-gray-600">
          <h1 className="text-[6rem]">403</h1>
          <div className="flex flex-col text-gray-500 text-2xl w-5/6 xl:w-1/2">
            <span>У Вас недостаточно прав для выполнения данного действия</span>
            <div className="flex gap-2 font-light">
              <span>
                Пожалуйста,
                {' '}
                <Link to="/login" className="underline">
                  войдите
                </Link>
                {' '}
                в систему или вернитесь обратно.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
