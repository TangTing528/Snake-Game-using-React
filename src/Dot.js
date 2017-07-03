import React, { Component } from 'react';
import './Dot.css';

class Dot extends Component {
  render() {
    return (
      <div className="Dot" style={this.props.style}>
      </div>
    );
  }
}

export default Dot;
