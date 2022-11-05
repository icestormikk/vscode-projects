/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import Loader from '../Loader';
import { replaceMaster } from '../../store/OrdersInfoSlice';
import getRandomCrewColor from '../../colorPallete';
import ControllersButtonsPanel from './ControllersButtonsPanel';
import LostComponent from './LostComponent';

Modal.setAppElement('#root');

export default function MastersChoise({
  mastersCompletedController, selectedSubservices, subservicesToMasters, masters,
}) {
  const [isLoading, setLoading] = React.useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

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
          {
            Object.entries(subservicesToMasters).map((entry) => {
              const [key, value] = entry;
              if (value.length === 0) {
                return (
                  <LostComponent />
                );
              }
              const currentSubservice = selectedSubservices.find((elem) => elem.id === parseInt(key, 10));
              const selectedMasterId = value.find((elem) => elem.isSelected === true).id;
              const selectedMaster = masters.find((elem) => elem.id === selectedMasterId);
              return (
                <div key={key} className="w-full bg-gray-200 border-[1px] border-gray-300 rounded-xl overflow-hidden block">
                  <div className="flex flex-row bg-gray-100 p-4 gap-4 relative text-sm">
                    <img src={selectedMaster.imageProfileUrl} alt="master's avatar" className="h-20 w-20 rounded-full border-[1px] border-gray-500 shadow-sm shadow-black" />
                    <div className="flex flex-col gap-1">
                      <h1 className="text-base">
                        {selectedMaster.name}
                        {' '}
                        {selectedMaster.surname}
                      </h1>
                      <p className="font-light">{selectedMaster.professionTitle}</p>
                    </div>
                    {
                      value.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="bg-gray-300 hover:bg-green-400 transition-colors duration-100 rounded-bl-xl p-2 absolute top-0 right-0 flex justify-center items-center gap-2"
                          >
                            <p>Выбрать</p>
                            <FiMoreHorizontal className="text-xl" />
                          </button>
                          <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setModalOpen(false)}
                            shouldCloseOnOverlayClick
                            shouldCloseOnEsc
                            className="Modal"
                            overlayClassName="Overlay"
                          >
                            <div className="flex justify-between items-center p-2">
                              <p>Выберите специалиста</p>
                              <button type="button" onClick={() => setModalOpen(false)}>Close</button>
                            </div>
                            <div>
                              {
                                value.map((val) => {
                                  const currentMaster = masters.find((elem) => elem.id === val.id);
                                  const subserviceId = key;
                                  const newSelectedMasterId = val.id;
                                  return !val.isSelected && (
                                    <div key={val.id} className="flex flex-row bg-gray-100 p-4 gap-4 relative text-sm">
                                      <img src={currentMaster.imageProfileUrl} alt="master's avatar" className="h-20 w-20 rounded-full border-[1px] border-gray-500 shadow-sm shadow-black" />
                                      <div className="flex flex-col gap-1">
                                        <h1 className="text-base">
                                          {currentMaster.name}
                                          {' '}
                                          {currentMaster.surname}
                                        </h1>
                                        <p className="font-light">{currentMaster.professionTitle}</p>
                                        <button
                                          type="button"
                                          className="bg-green-400 px-4 py-1 rounded-xl shadow-lg shadow-gray-400 hover:text-white transition-all duration-100 w-min"
                                          onClick={() => {
                                            dispatch(replaceMaster({ subserviceId, newSelectedMasterId }));
                                            setModalOpen(false);
                                          }}
                                        >
                                          Выбрать
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })
                              }
                            </div>
                          </Modal>
                        </>
                      )
                    }
                  </div>
                  <div className="p-2">
                    <p>{currentSubservice.title}</p>
                  </div>
                </div>
              );
            })
          }
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
