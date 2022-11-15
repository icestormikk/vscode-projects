import React from 'react';
import PropTypes from 'prop-types';

export default function Certificate({
  imageUrl, nominalValue, additionalTag,
}) {
  return (
    <div className="relative w-full h-1/3 bg-slate-100 rounded-xl flex flex-row overflow-hidden border-[1px] border-gray-300">
      <div className="absolute top-0 left-0">
        {additionalTag}
      </div>
      <img src={imageUrl} alt="certificate-icon" className="h-1/3 w-1/3 shadow-xl shadow-gray-400" />
      <div className="flex flex-col w-full justify-between text-center p-2 font-light lg:text-2xl sm:text-base text-black">
        <h1 className="text-base sm:text-2xl">
          Подарочный сертификат
        </h1>
        <p className="xl:text-[3.6rem] sm:text-[2.2rem] text-lg font-light italic whitespace-nowrap">
          {nominalValue.toLocaleString('ru')}
          {' '}
          рублей
        </p>
        <p className="sm:text-base text-sm">Сертификат не подлежит обмену</p>
      </div>
    </div>
  );
}

Certificate.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  nominalValue: PropTypes.number.isRequired,
  additionalTag: PropTypes.objectOf(PropTypes.shape),
};

Certificate.defaultProps = {
  additionalTag: null,
};
