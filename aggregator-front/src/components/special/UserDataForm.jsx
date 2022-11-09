import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types'

export default function UserDataForm() {
  const subservicesToDates = useSelector((state) => state.ordersInfo.subservicesToDates);
  return (
    <div>
      {
        Object.keys(subservicesToDates).map(
          (key) => (
            <h1 key={key}>
              {key}
              {' '}
              {new Date(subservicesToDates[key]).toLocaleString('ru')}
            </h1>
          ),
        )
      }
    </div>
  );
}

// UserDataForm.propTypes = {}
