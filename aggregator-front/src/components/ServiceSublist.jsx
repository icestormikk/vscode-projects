import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import Loader from './Loader';
import axios from 'axios';
import SubserviceElement from './special/SubserviceElement';

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
      isOpen: true,
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
                // in minutes (?)
                duration: 40,
                // in rubles
                lowerPrice: 100,
                // in rubles
                topPrice: 200,
              },
              {
                id: 1,
                title: "Стрижка 2",
                description: "Описание стрижки 2",
                duration: 122,
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
          }, 1000)
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
                            <SubserviceElement subservice={subservice}/>
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
