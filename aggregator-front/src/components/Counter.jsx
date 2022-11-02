import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCountUp } from 'react-countup';

export default function Counter({ trackedValue, counterId }) {
  const {
    update,
  } = useCountUp({
    ref: `${counterId}-counter`,
    start: 0,
    duration: 2,
  });

  useEffect(() => {
    update(trackedValue);
  });

  return (
    <div>
      <div id={`${counterId}-counter`} />
    </div>
  );
}

Counter.propTypes = {
  counterId: PropTypes.string.isRequired,
  trackedValue: PropTypes.number.isRequired,
};
