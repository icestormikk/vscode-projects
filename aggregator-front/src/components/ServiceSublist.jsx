import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import Loader from './Loader';

export default class ServiceSublist extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    chosenServiceTitle: PropTypes.string,
    subservices: PropTypes.array
  }

  static getDerivedStateFromProps(props, state) {
    if (props.chosenServiceTitle !== state.chosenServiceTitle) {
      return {
        chosenServiceTitle: props.chosenServiceTitle
      }
    }
    if (props.subservices !== state.subservices) {
      return {
        subservices: props.subservices
      };
    }
    if (props.isLoading !== state.isLoading) {
      return {
        isLoading: props.isLoading
      }
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: props.isLoading,
      chosenServiceTitle: props.chosenServiceTitle,
      subservices: props.subservices
    };

    this.handleListOpen = this.handleListOpen.bind(this);
  }

  handleListOpen() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <div className='flex justify-center'>
        <div className={'bg-gray-700 shadow-xl shadow-gray-500 p-6 mb-10 sm:w-11/12 w-full transition-all duration-100 rounded-xl ' + (this.state.isOpen ? 'h-max' : 'h-20')}>
            { 
              this.state.subservices.length === 0 ? <h1 className='text-gray-200 text-2xl'>Выберите услугу</h1> : (
                <>
                {this.state.isLoading ? <Loader size={20} color="#ffffff"/> : (
                  <div className='text-white text-2xl border-b-2 border-b-gray-400 pb-2 flex justify-between items-center'>
                    <h1>{this.state.chosenServiceTitle}</h1>
                    <AiOutlineDown onClick={this.handleListOpen} className={'cursor-pointer hover:text-yellow-300 transition-all duration-100 text-3xl scale-x-[1.5] ' + (this.state.isOpen ? 'rotate-180' : 'rotate-0')}/>
                  </div>
                )}
                </>
              )
            }
        </div>
      </div>
    )
  }
}
