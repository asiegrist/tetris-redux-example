import React from "react";
import PropTypes from "prop-types";

import Square from "./Square";
import Overlay from "./Overlay";

class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.board = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.launchGame = this.launchGame.bind(this);
  }

  componentDidMount() {
    /*this.timerID = setInterval(() => {
      this.props.moveIfPossible({ top: 1 });
    }, 1000);*/
    /*setTimeout(() => {
      clearInterval(this.timerID);
    }, 10000);*/
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  launchGame() {
    console.log('launch')
    this.props.launchGame();
    this.timerID = setInterval(() => {
      this.props.moveIfPossible({ top: 1 });
    }, 1000);
    this.board.current.focus();
  }

  handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      this.props.moveIfPossible({ top: 1 });
    }

    if (event.key === "ArrowLeft") {
      this.props.moveIfPossible({ left: -1 });
    }

    if (event.key === "ArrowRight") {
      this.props.moveIfPossible({ left: 1 });
    }

    if (["ArrowUp", " ", "Spacebar"].includes(event.key)) {
      this.props.rotateIfPossible();
    }
  }

  render() {
    const { pieces, status } = this.props;
    return (
      <div
        className={"board" + (status === "ONGOING" ? "" : " overlay")}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
        ref={this.board}
      >
        {status === "ONGOING" ? (
          pieces.map((piece, index) => <Square key={index} {...piece} />)
        ) : (<Overlay status={status} onClick={this.launchGame} />)}
      </div>
    );
  }
}

Board.propTypes = {
  pieces: PropTypes.array.isRequired
};

export default Board;
