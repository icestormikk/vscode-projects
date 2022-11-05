/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import axios from 'axios';
import Loader from './Loader';
import SubserviceElement from './special/SubserviceElement';

export default class ServiceSublist extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.chosenService !== state.chosenService) {
      return {
        chosenService: props.chosenService,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      chosenService: props.chosenService,
      subservices: [],
    };

    this.handleListOpen = this.handleListOpen.bind(this);
  }

  handleListOpen() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getServiceById(id) {
    if (id > -1) {
      this.setState(() => ({
        isLoading: true,
      }));

      axios
        .get('http://localhost:8080/services', {
          params: {
            subserviceId: id > 0 ? id : 1,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
        .finally(
          this.setState(() => ({
            subservices: [
              {
                id: 0,
                title: 'Стрижка 1',
                description: 'Описание стрижки 1',
                // in minutes (?)
                duration: 40,
                // in rubles
                lowerPrice: 100,
                // in rubles
                topPrice: 200,
                incompatibleServicesIDs: [1],
              },
              {
                id: 1,
                title: 'Стрижка 2',
                description: 'Описание стрижки 2',
                duration: 122,
                lowerPrice: 200,
                topPrice: 200,
                incompatibleServicesIDs: [0],
              },
              {
                id: 2,
                title: 'Стрижка 3',
                description: 'Описание стрижки 3',
                duration: 102,
                lowerPrice: 400,
                topPrice: 700,
                incompatibleServicesIDs: [],
              },
            ],
          })),
          // fake timeout
          setTimeout(() => {
            this.setState(() => ({
              isLoading: false,
            }));
          }, 1000),
        );
    }
  }

  render() {
    const sublistState = this.state;

    return (
      <div className="flex justify-center">
        <div
          className={
            `bg-gray-700 shadow-xl shadow-gray-500 p-6 mb-10 sm:w-3/4 w-full transition-all duration-100 overflow-hidden rounded-xl ${sublistState.isOpen ? 'h-max' : 'h-20'}`
          }
        >
          {sublistState.isLoading ? (
            <Loader height={40} width={40} colorCode="#ffffff" />
          ) : (
            sublistState.subservices.length === 0 ? (
              <h1 className="text-gray-200 text-xl">
                Выберите услугу
              </h1>
            ) : (
              <>
                <div className="text-white text-xl border-b-2 border-b-gray-400 pb-2 my-2 flex justify-between items-center">
                  <h1>
                    {sublistState.chosenService.title}
                  </h1>
                  <AiOutlineDown
                    onClick={this.handleListOpen}
                    className={
                      `cursor-pointer hover:text-yellow-300 transition-all duration-100 text-2xl scale-x-[1.5] ${sublistState.isOpen
                        ? 'rotate-180'
                        : 'rotate-0'}`
                    }
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {sublistState.subservices.map(
                    (subservice) => (
                      <SubserviceElement
                        key={subservice.id}
                        subservice={subservice}
                      />
                    ),
                  )}
                </div>
              </>
            )
          )}
        </div>
      </div>
    );
  }
}

ServiceSublist.propTypes = {
  chosenService: PropTypes.objectOf(PropTypes.shape).isRequired,
};
