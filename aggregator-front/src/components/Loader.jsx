/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Triangle } from 'react-loader-spinner';

export default function Loader(props) {
  return (
    <div
      className={
        `w-full ${
          props.isOnFullScreen ? 'h-screen' : 'h-full'
        } flex flex-col text-secondary-color justify-center items-center`
      }
    >
      <Triangle
        height={props.height || props.size}
        width={props.width || props.size}
        color={props.colorCode}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible
      />
      <h1 className="text-xl" style={{ color: props.colorCode }}>
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
