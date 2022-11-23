import React from 'react';
import PropTypes from 'prop-types';
import Separator from './Separator';

export default function ClientInfo({
  client,
}) {
  return (
    <span>
      {' '}
      {client.name}
      {' '}
      {client.surname}
      <Separator />
      {' '}
      {client.phone}
    </span>
  );
}

ClientInfo.propTypes = {
  client: PropTypes.objectOf(PropTypes.shape).isRequired,
};
