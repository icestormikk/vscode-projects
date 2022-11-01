import React from 'react';
import PropTypes from 'prop-types';

const MINUTES_IN_HOUR = 60;

export default function TimeDisplay({ durationInMins }) {
  const hours = parseInt(durationInMins / MINUTES_IN_HOUR, 10);
  const minutes = parseInt(durationInMins % MINUTES_IN_HOUR, 10);

  return (
    <p>
      {hours > 0
        ? `${hours} ч `
        : ''}
      {minutes > 0
        ? `${minutes} мин`
        : ''}
    </p>
  );
}

TimeDisplay.propTypes = {
  durationInMins: PropTypes.number.isRequired,
};
