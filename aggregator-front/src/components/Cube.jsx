import React, { Component } from 'react'
import 'css/index.css'

export default class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
        letter: props.letter || "A",
        color: props.color || "#ff0000",
        emotion: ":)"
    }
  }
  
  render() {
    return (
      <div className='cube-wrapper'>
        <div className='cube text-5xl font-bold text-white'>
            <div className='cube-top flex items-center justify-center' style={{backgroundColor: this.state.color}}>
                <p>{this.state.emotion}</p>
            </div>
            <div className='cube-front shadow-inner flex items-center justify-center' style={{backgroundColor: this.state.color}} >
                <p>{this.state.letter}</p>
            </div>
        </div>
      </div>
    )
  }
}
