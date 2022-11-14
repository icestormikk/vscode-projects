import React from 'react';
import PropTypes from 'prop-types';

export default function Certificate({
  imageUrl, nominalValue, additionalTag,
}) {
  return (
    <div className="relative w-full h-1/3 bg-yellow-100 rounded-sm flex flex-row overflow-hidden">
      <div className="absolute top-10 left-10">
        {additionalTag}
      </div>
      <img src={imageUrl} alt="certificate-icon" className="h-1/3 w-1/3" />
      <div className="flex flex-col w-full justify-between text-center py-2 sm:px-24 px-2 font-light lg:text-2xl sm:text-base text-black">
        <h1 className="text-base sm:text-xl">
          Подарочный сертификат
        </h1>
        <p className="xl:text-[3.6rem] sm:text-[1.6rem] text-lg font-light italic whitespace-nowrap">
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
