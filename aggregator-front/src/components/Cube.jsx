import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/index.css';

export default class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: props.letter || 'A',
      colorCode: props.colorCode || '#ff0000',
      emotion: props.emotion || ':)',
    };
  }

  render() {
    const cubeState = this.state;
    return (
      <div className="cube-wrapper">
        <div className="cube text-5xl font-bold text-white">
          <div
            className="cube-top flex items-center justify-center"
            style={{ backgroundColor: `${cubeState.colorCode}` }}
          >
            <p>{cubeState.emotion}</p>
          </div>
          <div
            className="cube-front shadow-inner flex items-center justify-center"
            style={{ backgroundColor: `${cubeState.colorCode}` }}
          >
            <p>{cubeState.letter}</p>
          </div>
        </div>
      </div>
    );
  }
}

Cube.propTypes = {
  letter: PropTypes.string.isRequired,
  colorCode: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
};
