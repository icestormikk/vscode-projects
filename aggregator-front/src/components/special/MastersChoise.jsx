/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import ControllersButtonsPanel from './ControllersButtonsPanel';
import MasterAndServiceDisplay from './MasterAndServiceDisplay';

export default function MastersChoise({
  mastersCompletedController, selectedSubservices, subservicesToMasters, masters,
}) {
  const [isLoading, setLoading] = React.useState(true);

  useState(() => {
    setLoading(false);
  });

  return (
    isLoading ? (
      <Loader
        colorCode="#111827"
        height={100}
        width={100}
        isOnFullScreen
      />
    ) : (
      <>
        <div className="flex justify-between items-center text-gray-500 ">
          <h1 className="my-4 text-2xl">Выбор специалистов</h1>
          <h1 className="my-4 text-xl whitespace-nowrap">1 / 3</h1>
        </div>
        <div className="flex flex-col gap-4">
          <MasterAndServiceDisplay
            selectedSubservices={selectedSubservices}
            subservicesToMasters={subservicesToMasters}
            masters={masters}
            isFewMasters
          />
        </div>
        <ControllersButtonsPanel
          addressToComeback="/services"
          nextStageAction={mastersCompletedController}
        />
      </>
    )
  );
}

MastersChoise.propTypes = {
  mastersCompletedController: PropTypes.func.isRequired,
  selectedSubservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subservicesToMasters: PropTypes.objectOf(PropTypes.shape).isRequired,
  masters: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
