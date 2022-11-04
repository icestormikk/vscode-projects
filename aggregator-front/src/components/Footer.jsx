/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ companyName, socialMediaLinks }) {
  return (
    <div className="bg-secondary-color flex justify-center items-center p-8 text-gray-300 text-base font-light">
      <div className="flex flex-col-reverse text-center lg:flex-row justify-between gap-8 items-center w-2/3">
        <p>{`@2022 ${companyName}`}</p>
        <div className="flex flex-col gap-3">
          <p>8-800-555-35-35</p>
          <p>test@testmail.com</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          {socialMediaLinks
            && socialMediaLinks.map((link) => (
              <a
                href={link.url}
                key={link.url}
                className="p-3 bg-gray-700 hover:bg-gray-600 transition-all duration-100 rounded-full text-[1.5em]"
              >
                {link.icon}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string.isRequired,
  socialMediaLinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
