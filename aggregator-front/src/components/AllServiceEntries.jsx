/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { Calendar } from 'react-calendar';

export default function AllServiceEntries() {
  const [value, setValue] = React.useState(new Date());

  function handleDateChange(date) {
    console.log(date);
    setValue(date);
  }

  return (
    <div className="p-2 w-full flex justify-center items-start border-b-[1px] border-b-gray-300">
      <Calendar
        onChange={(date) => handleDateChange(date)}
        tileContent={({ date, view }) => (
          <div className="py-1">
            <p>{date.getDate()}</p>
            <div className="flex justify-around">
              <p className="rounded-full flex justify-center items-center text-sm bg-[#de0e7a] text-white h-5 w-5">
                3
              </p>
            </div>
          </div>
        )}
        value={value}
        className="rc-style"
        locale="ru-RU"
        minDetail="month"
        minDate={new Date()}
        selectRange
        showNeighboringMonth={false}
      />
    </div>
  );
}
