/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import LostComponent from './LostComponent';
import { replaceMaster } from '../../store/OrdersInfoSlice';
import TimeDisplay from './TimeDisplay';
import DateTimeContainer from './DateTimeContainer';
import { groupDatesObject, toObject } from '../../datesTransformFunctions';

Modal.setAppElement('#root');

export default function MasterAndServiceDisplay(
  {
    selectedSubservices, subservicesToMasters, masters, isFewMasters, showWithDateTimes,
    setErrorController,
  },
) {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorController(Object.values(subservicesToMasters).some((el) => el.length === 0));
  });

  return (
    <div className="flex flex-col gap-2">
      {
        Object.values(subservicesToMasters).some((el) => el.length === 0) ? (
          <LostComponent />
        ) : (
          Object.entries(subservicesToMasters).map((entry) => {
            const [key, value] = entry;
            if (value.length === 0) {
              return (
                <LostComponent key={key} />
              );
            }
            const currentSubservice = selectedSubservices.find(
              (elem) => elem.id === parseInt(key, 10),
            );
            const selectedMasterId = value.find((elem) => elem.isSelected === true).id;
            const selectedMaster = masters.find((elem) => elem.id === selectedMasterId);
            return (
              <div key={key} className="flex flex-col">
                <div className="w-full bg-gray-200 border-[1px] border-gray-300 rounded-xl overflow-hidden block">
                  <div className="flex flex-row bg-gray-100 p-4 gap-4 relative text-sm">
                    <img src={selectedMaster.imageProfileUrl} alt="master's avatar" className="h-16 w-16 rounded-full border-[1px] border-gray-500 shadow-sm shadow-black" />
                    <div className="flex flex-col">
                      <h1 className="text-base">
                        {selectedMaster.name}
                        {' '}
                        {selectedMaster.surname}
                      </h1>
                      <p className="font-light">{selectedMaster.professionTitle}</p>
                    </div>
                    {
                      isFewMasters && (
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
                                <button type="button" onClick={() => setModalOpen(false)}>
                                  <AiOutlineClose className="text-red-600 font-extrabold text-xl" />
                                </button>
                              </div>
                              <div>
                                {
                                  value.map((val) => {
                                    const currentMaster = masters.find(
                                      (elem) => elem.id === val.id,
                                    );
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
                                              dispatch(
                                                replaceMaster(
                                                  { subserviceId, newSelectedMasterId },
                                                ),
                                              );
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
                      )
                    }
                  </div>
                  <div className="p-2 text-sm">
                    <p>{currentSubservice.title}</p>
                    <div className="flex flex-row items-center gap-2 font-light">
                      <p className="h-max">
                        {currentSubservice.lowerPrice === currentSubservice.topPrice
                          ? '' : `${currentSubservice.lowerPrice} - `}
                        {currentSubservice.topPrice}
                        {' '}
                        RUB
                      </p>
                      <p className="text-2xl text-blue-500"> &#x2022; </p>
                      <div className="flex flex-row gap-2">
                        <TimeDisplay durationInMins={currentSubservice.duration} />
                      </div>
                    </div>
                  </div>
                </div>
                {showWithDateTimes && (
                  <div id="dateContainer" className="flex flex-col gap-2">
                    <DateTimeContainer
                      initialDates={groupDatesObject(toObject(selectedMaster.availableDates))}
                      relatedSubservices={[currentSubservice]}
                    />
                  </div>
                )}
              </div>
            );
          })
        )
      }
    </div>
  );
}

MasterAndServiceDisplay.propTypes = {
  isFewMasters: PropTypes.bool,
  showWithDateTimes: PropTypes.bool,
  selectedSubservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subservicesToMasters: PropTypes.objectOf(PropTypes.shape).isRequired,
  masters: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setErrorController: PropTypes.func.isRequired,
};
MasterAndServiceDisplay.defaultProps = {
  isFewMasters: false,
  showWithDateTimes: false,
};
