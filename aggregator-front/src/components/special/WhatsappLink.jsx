import React from 'react';
import PropTypes from 'prop-types';
import { ImWhatsapp } from 'react-icons/im';

export default function WhatsappLink({ phoneNumber }) {
  return (
    <div className="flex gap-2 justify-center items-center text-xl text-green-600">
      <p>{phoneNumber}</p>
      <ImWhatsapp />
    </div>
  );
}

WhatsappLink.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};
