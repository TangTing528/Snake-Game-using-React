import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dot from './Dot';
import Snake from './Snake';
import GameOver from './GameOver';

class App extends Component {
  constructor(){
    super();
    this.state ={
      //initial length: 4,
      //0 is for east, 1 is for south, 2 is for west, 3 is for north
      //start direction is head to east
      direction: 0,
      position: [{top:0, left:0},
                 {top:0, left:10},
                 {top:0, left:20},
                 {top:0, left:30}
               ],
      dotPosition: {top:0, left:0},
      score: 0
    };

  }
  /**
  * set snake to next position
  * add a new dot position to the end of this.state.position
  * delete the first dot positon from this.state.position
  * 0: left, 1: down, 2: right, 3: up
  */
  nextPosition(){
    const current = this.state.position;
    const length = current.length;
    const direction = this.state.direction;
    if(this.isGameOver()) {
      clearInterval(this.interval);
      document.getElementById("newGame").style.visibility = "visible";
      document.getElementById("GameOver-frame").style.visibility = "visible";
    }else {
      let lastPosition = current[length-1];
      let newPosition = {};
      if(direction == 0){
        newPosition = {top: lastPosition.top, left: lastPosition.left+10}
      }else if(direction == 1){
        newPosition = {top: lastPosition.top + 10, left: lastPosition.left}
      }else if(direction == 2){
        newPosition = {top: lastPosition.top, left: lastPosition.left - 10}
      }else {
        newPosition = {top: lastPosition.top - 10, left: lastPosition.left}
      }
      //push newPosition in and delete the first Dot
      current.push(newPosition);
      //check if hit the dot
      if(this.hitDot()){
        this.randomDot();
        let newScore = this.state.score + 1;
        this.setState({score: newScore});
      }else{
        current.shift();
      }
      //reset position in state
      this.setState({position: current});
    }
  }
  /**
  * check if the game is over
  * 1. the last dot position beyond the boundray, game over
  * 2. the head hit its own body, game over
  */
  isGameOver(){
    const current = this.state.position;
    const length = current.length;
    const snakeHead = current[length-1];
    if(snakeHead.top > 690 || snakeHead.left > 690 || snakeHead.top < 0
        || snakeHead.left < 0){
      return true;
    }
    //check if head hit its body
    for(let i=0; i<length-1; i++){
      if(current[i].top === snakeHead.top && current[i].left === snakeHead.left) {
        return true;
      }
    }
    return false;
  }
  /**
  * handle keypress, and to change direction when up, down, left, right pressed
  */
  changeDirection(event){
    let direciton = this.state.direction;
    //if the direciton now is , then can turn up(3) and down(1)
    //if the direciton now is up(3) and down(1), then can turn left(0) or right(2)
    if(direciton == 0 || direciton == 2){
      if(event.key === "ArrowUp"){
        this.setState({direction: 3});
      }else if(event.key === "ArrowDown"){
        this.setState({direction: 1});
      }
    }else {
      if(event.key === "ArrowRight"){
        this.setState({direction: 0});
      }else if(event.key === "ArrowLeft"){
        this.setState({direction: 2});
      }
    }
  }
  /**
  * create random dot
  */
  randomDot(){
    let top = 0;
    let left = 0;
    //check if the dot is inside the snake
    const position = this.state.position;
    let flag = true;
    while(flag){
      flag = false;
      top = Math.floor(Math.random() * (69 - 0 + 1)) * 10;
      left = Math.floor(Math.random() * (69 - 0 + 1)) * 10;
      for(let i=0; i<position.length; i++){
        if(position[i].top === top  && position[i].left === left){
          flag = true;
          break;
        }
      }
    }
    this.setState({dotPosition: {top: top, left: left}});
  }
  /**
  * check if snake hit the dot
  * this funciton needs to be call in snake's every move
  */
  hitDot(){
    const current = this.state.position;
    const length = current.length;
    const snakeHead = current[length-1];
    const dotPosition = this.state.dotPosition;
    if(dotPosition.top === snakeHead.top && dotPosition.left === snakeHead.left){
      return true;
    }
    return false;
  }
  /**
  * start a new game, to set all state to be initial data, reset interval
  */
  newGame(){
    //intial state
    this.setState(
      {
        direction: 0,
        position: [{top:0, left:0},
                   {top:0, left:10},
                   {top:0, left:20},
                   {top:0, left:30}
                 ],
        dotPosition: {top:0, left:0},
        score: 0
      }
    );
    //make GameOver and start new game button invisible
    document.getElementById("GameOver-frame").style.visibility = "hidden";
    document.getElementById("newGame").style.visibility = "hidden";
    //reset interval
    this.interval = setInterval(() => {this.nextPosition()}, 200);

  }

  /**
  * set interval
  * set keyboard listener
  */
  componentDidMount(){
    this.interval = setInterval(() => {this.nextPosition()}, 200);
    window.addEventListener("keydown", (e) => this.changeDirection(e), false);
    this.randomDot();
  }

  /**
  * delete the keyboard listener
  */
  componentWillUnmount(){
    window.RemoveEventListener("keydown", (e) => this.changeDirection(e));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Play Snake</h2>
        </div>
        <div className="App-body">
          <div className="App-board">
            <Snake ref={instance => {this.move = instance;}}
              position={this.state.position}
            />
            <Dot style={this.state.dotPosition}/>
            <GameOver />
          </div>
          <div className="App-dashBoard">
            <p>Score: {this.state.score}</p>
            <button className="newGame" id="newGame" onClick={() => this.newGame()}> Start a new game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
