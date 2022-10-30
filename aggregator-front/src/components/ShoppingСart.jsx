import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ShoppingСart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      selectedServices: props.selectedServices,
    };
  }

  render() {
    return (
      <div className="fixed flex justify-center items-center bottom-0 left-0 w-full p-4 bg-white">
        <h1>Shopping Cart</h1>
      </div>
    );
  }
}

ShoppingСart.propTypes = {
  selectedServices: PropTypes.arrayOf(PropTypes.shape),
};

ShoppingСart.defaultProps = {
  selectedServices: [],
};
