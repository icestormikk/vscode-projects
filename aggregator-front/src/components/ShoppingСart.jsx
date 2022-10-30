/* eslint-disable react/no-unused-class-component-methods */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Counter from './Counter';

export default class ShoppingСart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServices: props.selectedServices,
    };
  }

  addServiceToCart(service) {
    this.selectedServices.push(service);
  }

  render() {
    const cartState = this.state;

    return (
      cartState.selectedServices.length && (
        <div className="fixed flex justify-center items-center bottom-0 left-0 w-full p-4 bg-[#dddddd] text-2xl text-secondary-color">
          <Counter />
        </div>
      )
    );
  }
}

ShoppingСart.propTypes = {
  selectedServices: PropTypes.arrayOf(PropTypes.shape),
};

ShoppingСart.defaultProps = {
  selectedServices: [],
};
