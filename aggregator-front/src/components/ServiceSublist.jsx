import axios from 'axios';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { AiOutlineDown } from 'react-icons/ai'

export default class ServiceSublist extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    chosenServiceId: PropTypes.number.isRequired
  }

  static getDerivedStateFromProps(props, state) {
    if (props.chosenServiceId !== state.chosenServiceId) {
      return {
        chosenServiceId: props.chosenServiceId
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      chosenServiceId: props.chosenServiceId
    };

    this.handleListOpen = this.handleListOpen.bind(this);
  }

  componentDidUpdate() {
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => {console.log(response.data)})
      .catch(error => {console.log(error)});
  }

  handleListOpen() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
    console.log(this.state.isOpen)
  }

  render() {
    return (
      <div className='flex justify-center'>
        <div className={'bg-gray-700 shadow-xl shadow-gray-500 p-6 mb-10 sm:w-11/12 w-full transition-all duration-100 rounded-xl ' + (this.state.isOpen ? 'h-max' : 'h-20')}>
            { 
              this.state.chosenServiceId === -1 ? <h1 className='text-gray-200 text-2xl'>Выберите услугу</h1> : (
                <div className='text-white text-2xl border-b-2 border-b-gray-400 pb-2 flex justify-between items-center'>
                  <h1>{this.state.chosenServiceId}</h1>
                  <AiOutlineDown onClick={this.handleListOpen} className={'cursor-pointer hover:text-yellow-300 transition-all duration-100 text-3xl scale-x-[1.5] ' + (this.state.isOpen ? 'rotate-180' : 'rotate-0')}/>
                </div>
              )
            }
        </div>
      </div>
    )
  }
}
