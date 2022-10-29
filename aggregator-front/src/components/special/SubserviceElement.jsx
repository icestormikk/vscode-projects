import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaRubleSign } from 'react-icons/fa'

const MINUTES_IN_HOUR = 60;

export default class SubserviceElement extends Component {
  static propTypes = {
    subservice: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
        subservice: props.subservice
    }
  }

  render() {
    return (
        <div className='text-xl flex justify-between items-center hover:bg-gray-500 bg-gray-600 duration-100 p-2 rounded-lg h-max transition-all'>
            <div>
                <h2>{this.state.subservice.title}</h2>
                <p className='font-light max-w-3xl break-words'>{this.state.subservice.description}</p>
                <div className='flex flex-col sm:flex-row gap-2 sm:text-base xl:text-xl'>
                    <p>{ this.state.subservice.lowerPrice === this.state.subservice.topPrice ? '' : this.state.subservice.lowerPrice + ' - '}
                    {this.state.subservice.topPrice}<FaRubleSign/> • </p>
                    <p>{ parseInt(this.state.subservice.duration / MINUTES_IN_HOUR) > 0 ? parseInt(this.state.subservice.duration / MINUTES_IN_HOUR) + ' ч ': ''} 
                    {parseInt(this.state.subservice.duration % MINUTES_IN_HOUR)} мин</p>
                </div>
            </div>
            <button className='bg-green-600 h-full p-2 text-md rounded-lg'>Выбрать</button>
        </div>
      )
  }
}
