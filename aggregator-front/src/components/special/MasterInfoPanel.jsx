import React from 'react';
import PropTypes from 'prop-types';
import Separator from './Separator';

export default function MasterInfoPanel({
  master,
}) {
  return (
    <span>
      {' '}
      {master.name}
      {' '}
      {master.surname}
      <Separator />
      {master.email}
      <Separator />
      {master.phone}
    </span>
  );
}

MasterInfoPanel.propTypes = {
  master: PropTypes.objectOf(PropTypes.shape).isRequired,
};
