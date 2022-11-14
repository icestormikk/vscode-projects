import React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function AddressPanel({
  address, phone, locationLink,
}) {
  return (
    <div className="overflow-hidden relative min-h-[50vh] w-full bg-slate-100 text-black flex flex-col lg:flex-[30%] justify-center items-center p-4 rounded-lg shadow-lg border-[1px] border-gray-200 hover:shadow-xl hover:shadow-gray-300 duration-100 transition-all">
      <div className="absolute text-[22rem] text-slate-200">
        <FaMapMarkerAlt />
      </div>
      <div id="address-panel" className="w-2/3 flex flex-col gap-6 text-center font-light z-0">
        <div>
          <h1>Адрес</h1>
          <p>{address}</p>
        </div>
        <div>
          <h1>Телефон</h1>
          <p>{phone}</p>
        </div>
        <div className="flex justify-center items-center">
          <a
            href={locationLink}
            className="px-6 rounded-lg py-2 bg-[rgb(76,199,5)] font-bold text-white w-max mt-14"
            target="blank"
          >
            Посмотреть на карте
          </a>
        </div>
      </div>
    </div>
  );
}

AddressPanel.propTypes = {
  address: PropTypes.objectOf(PropTypes.shape).isRequired,
  phone: PropTypes.objectOf(PropTypes.shape).isRequired,
  locationLink: PropTypes.objectOf(PropTypes.shape).isRequired,
};
