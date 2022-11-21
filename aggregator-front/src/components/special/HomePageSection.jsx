/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

export default function HomePageSection(props) {
  return (
    <div
      className={
        `w-full relative flex justify-center ${
          props.heightCoefficient}`
      }
    >
      <img
        src={props.backgroundPicture}
        alt=""
        className="absolute top-0 left-0 z-[-1] h-full w-full object-cover brightness-50"
      />
      <div
        className={
            `w-5/6 my-2 flex ${
              props.textside === 'right'
                ? 'justify-end'
                : 'justify-start'}`
        }
      >
        <div className="lg:w-1/2 w-full flex flex-col gap-4 justify-center">
          {props.sectionTitle}
          {props.description}
          {props.button}
        </div>
      </div>
    </div>
  );
}

HomePageSection.propTypes = {
  heightCoefficient: PropTypes.string.isRequired,
  backgroundPicture: PropTypes.string.isRequired,
  textside: PropTypes.string.isRequired,
  sectionTitle: PropTypes.objectOf(PropTypes.shape).isRequired,
  description: PropTypes.objectOf(PropTypes.shape).isRequired,
  button: PropTypes.objectOf(PropTypes.shape),
};

HomePageSection.defaultProps = {
  button: undefined,
};
