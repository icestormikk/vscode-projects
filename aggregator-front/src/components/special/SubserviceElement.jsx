import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MINUTES_IN_HOUR = 60;

export default class SubserviceElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subservice: props.subservice,
    };
  }

  render() {
    const elementState = this.state;
    return (
      <div className="text-xl flex justify-between items-center bg-gray-600 duration-100 p-2 rounded-lg h-max transition-all">
        <div>
          <h2>{elementState.subservice.title}</h2>
          <p className="font-light max-w-3xl break-words">
            {elementState.subservice.description}
          </p>
          <div className="flex flex-row justify-start items-center gap-2 sm:text-base xl:text-xl">
            <p className="h-max">
              {elementState.subservice.lowerPrice === elementState.subservice.topPrice
                ? ''
                : `${elementState.subservice.lowerPrice} - `}
              {elementState.subservice.topPrice}
              {' '}
              RUB
            </p>
            <p className="text-2xl text-gray-300"> &#x2022; </p>
            <p>
              {parseInt(
                elementState.subservice.duration / MINUTES_IN_HOUR,
                10,
              ) > 0
                ? `${parseInt(
                  elementState.subservice.duration / MINUTES_IN_HOUR,
                  10,
                )} ч `
                : ''}
              {parseInt(
                elementState.subservice.duration % MINUTES_IN_HOUR,
                10,
              )}
              {' '}
              мин
            </p>
          </div>
        </div>
        <button
          type="button"
          className="bg-gray-500 font-normal hover:bg-gray-400 transition-colors duration-100 h-full p-2 text-md rounded-lg"
        >
          Выбрать
        </button>
      </div>
    );
  }
}

SubserviceElement.propTypes = {
  subservice: PropTypes.objectOf(PropTypes.shape).isRequired,
};
