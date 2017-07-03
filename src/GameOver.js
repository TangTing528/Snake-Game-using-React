import React, { Component } from 'react';
import './GameOver.css';

class GameOver extends Component {
  render() {
    return (
      <div className="GameOver-frame" id="GameOver-frame">
        <div className="GameOver-content">
          Game Over
        </div>
      </div>
    );
  }
}

export default GameOver;
