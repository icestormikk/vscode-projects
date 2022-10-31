/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSubservicesPrice: props.price,
    };
  }

  render() {
    const counterState = this.state;

    return (
      <CountUp
        start={0}
        end={counterState.totalSubservicesPrice}
        onEnd={() => console.log('ended')}
        onStart={() => console.log('started')}
        onUpdate={() => console.log('updated')}
      >
        {({ countUpRef, start, update }) => (
          <div>
            <span ref={countUpRef} />
            <button type="button" onClick={start}>Start</button>
            <button type="button" onClick={update}>Update</button>
          </div>
        )}
      </CountUp>
    );
  }
}

Counter.propTypes = {
  price: PropTypes.number.isRequired,
};
