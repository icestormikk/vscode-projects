import React from 'react';
import PropTypes from 'prop-types';

export default function SpecialTag({ text, colorCode, textColor }) {
  return (
    <div className="sm:text-base text-[0.5em] px-2 sm:py-1 rounded-br-xl" style={{ color: `${textColor}`, backgroundColor: `${colorCode}` }}>
      <h1>{text}</h1>
    </div>
  );
}

SpecialTag.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  colorCode: PropTypes.string.isRequired,
};

SpecialTag.defaultProps = {
  textColor: '#efefef',
};
