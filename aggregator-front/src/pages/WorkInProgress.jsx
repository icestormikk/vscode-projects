import React from 'react';
import workInProgressPicture from '../static/pictures/work_in_progress.png';

export default function WorkInProgress() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-max h-max flex flex-col items-center text-2xl">
        <img src={workInProgressPicture} alt="work in progress.." className="h-72 w-72" />
        <h1>Сейчас здесь ничего нет... Но в скором времени будет ;)</h1>
      </div>
    </div>
  );
}
