import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { FaRubleSign } from 'react-icons/fa'
import Loader from './Loader';
import axios from 'axios';

export default class ServiceSublist extends Component {
  static propTypes = {
    chosenServiceInfoObject: PropTypes.object,
  }
  static getDerivedStateFromProps(props, state) {
    if (props.chosenService !== state.chosenService) {
      return {
        chosenService: props.chosenService
      }
    }
    return null
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      chosenService: props.chosenService,
      subservices: []
    };

    this.handleListOpen = this.handleListOpen.bind(this);
  }

  getServiceById(id) {
    if (id > -1) {
      this.setState(() => ({
        isLoading: true
      }))

      axios.get("https://jsonplaceholder.typicode.com/todos/" + (id > 0 ? id : 1))
        .then(() => {
          console.log("Response: " + this.state.chosenService.id)
          this.setState(() => ({
            subservices : [
              {
                id: 0,
                title: "Стрижка 1",
                description: "Описание стрижки 1",
                lowerPrice: 100,
                topPrice: 200,
              },
              {
                id: 1,
                title: "Стрижка 2",
                description: "Описание стрижки 2",
                lowerPrice: 200,
                topPrice: 200,
              }
            ]
          }));
        })
        .catch(error => {
          console.log("Error: " + error)
        }) 
        .finally(
          //fake timeout
          setTimeout(() => {
            this.setState(() =>( {
              isLoading: false,
            }))
          }, 2000)
        )
    }
  }

  handleListOpen() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return (
      <div className='flex justify-center'>
        <div className={'bg-gray-700 shadow-xl shadow-gray-500 p-6 mb-10 sm:w-3/4 w-full transition-all duration-100 overflow-hidden rounded-xl ' + (this.state.isOpen ? 'h-max' : 'h-20')}>
            { 
              this.state.isLoading ? <Loader size={40} color="#ffffff"/> : (
                <>
                  {this.state.subservices.length === 0 ? <h1 className='text-gray-200 text-2xl'>Выберите услугу</h1> : (
                    <>
                      <div className='text-white text-2xl border-b-2 border-b-gray-400 pb-2 mb-2 flex justify-between items-center'>
                        <h1>{this.state.chosenService.title}</h1>
                        <AiOutlineDown onClick={this.handleListOpen} className={'cursor-pointer hover:text-yellow-300 transition-all duration-100 text-3xl scale-x-[1.5] ' + (this.state.isOpen ? 'rotate-180' : 'rotate-0')}/>
                      </div>
                      <div className='flex flex-col gap-4'>
                        {
                          this.state.subservices.map(subservice => (
                            <div key={subservice.id} className='text-xl flex justify-between items-center hover:bg-gray-500 bg-gray-600 duration-100 p-2 rounded-lg transition-all'>
                              <div>
                                <h2>{subservice.title}</h2>
                                <p className='font-light max-w-3xl break-words'>{subservice.description}</p>
                              </div>
                              <div>
                                {
                                  subservice.lowerPrice === subservice.topPrice ? 
                                  <p className='flex gap-1 items-center'>{subservice.lowerPrice}<FaRubleSign/></p> 
                                  : 
                                  <p className='flex gap-1 items-center'>{subservice.lowerPrice} - {subservice.topPrice}<FaRubleSign/></p>
                                }
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  )}
                </>
              )
            }
        </div>
      </div>
    )
  }
}
