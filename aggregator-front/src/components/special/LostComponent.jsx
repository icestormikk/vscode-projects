import React from 'react';
import { BiError } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function LostComponent() {
  return (
    <div className="max-w-1/3 h-max p-2 text-gray-500 text-center italic text-xl flex justify-center items-center flex-col">
      <BiError className="text-[6rem] text-red-500" />
      <p>Отсутствуют данные для отображения..</p>
      <span>
        Попробуйте перезагрузить страницу или вернитесь на
        {' '}
        <Link to="/" className="underline font-bold">главную страницу</Link>
      </span>
    </div>
  );
}
