import React from 'react';
import PropTypes from 'prop-types';
import Separator from './Separator';
import TimeDisplay from './TimeDisplay';

export default function SubserviceInfoPanel({
  subservice,
}) {
  return (
    <span>
      {subservice.title}
      <Separator />

      {subservice.lowerPrice === subservice.topPrice
        ? '' : `${subservice.lowerPrice}-`}
      {subservice.topPrice}
      {' '}
      RUB

      <Separator />
      <TimeDisplay durationInMins={subservice.duration} />
    </span>
  );
}

SubserviceInfoPanel.propTypes = {
  subservice: PropTypes.objectOf(PropTypes.shape).isRequired,
};
