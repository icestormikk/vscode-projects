import React from 'react';
import image1 from '../static/pictures/ourworks/img-1103.png';
import image2 from '../static/pictures/ourworks/img-1104.png';

export default function Jobs() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 my-20 h-full text-gray-500 text-xl flex justify-cnter">
        <div className="w-full h-max bg-[#f5f3cc] flex justify-between rounded-sm overflow-hidden">
          <img src={image1} alt="" className="object-contain" />
          <img src={image2} alt="" className="object-fill" />
        </div>
      </div>
    </div>
  );
}
