import React, { Component } from 'react';
import Dot from './Dot';
import ReactDOM from 'react-dom';

class Snake extends Component {
  render() {
    const position = this.props.position;
    const snakeDot = position.map((style) => <Dot style={style} />);
    return (
      <div>
        {snakeDot}
      </div>
    );
  }
}
export default Snake;
