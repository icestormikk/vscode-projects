import React from 'react';
import PropTypes from 'prop-types';
import { Triangle } from 'react-loader-spinner';

export default function Loader({
  size, height, width, colorCode, isOnFullScreen,
}) {
  return (
    <div
      className={
        `w-full ${isOnFullScreen ? 'h-screen' : 'h-full'
        } flex flex-col text-secondary-color justify-center items-center`
      }
    >
      <Triangle
        height={height || size}
        width={width || size}
        color={colorCode}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible
      />
      <h1 className="text-xl text-center" style={{ color: colorCode }}>
        Загружаем данные. Подождите минутку..
      </h1>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.number,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  colorCode: PropTypes.string.isRequired,
  isOnFullScreen: PropTypes.bool,
};
Loader.defaultProps = {
  size: 100,
  isOnFullScreen: false,
};
