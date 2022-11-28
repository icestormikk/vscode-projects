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
  const [isError, setIsError] = React.useState(false);

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
        <div className="flex flex-col gap-4">
          <MasterAndServiceDisplay
            selectedSubservices={selectedSubservices}
            subservicesToMasters={subservicesToMasters}
            masters={masters}
            setErrorController={setIsError}
            isFewMasters
          />
        </div>
        <ControllersButtonsPanel
          addressToComeback="/services"
          nextStageAction={mastersCompletedController}
          isErrorState={isError}
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
