import React from "react";
import PropTypes from "prop-types";

import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.launchGame = this.launchGame.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.props.moveIfPossible({ top: 1 });
    }, 1000);

    /*setTimeout(() => {
      clearInterval(this.timerID);
    }, 40000);*/
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  launchGame() {
    this.props.startGame();
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
      >
        {status === "ONGOING" ? (
          pieces.map((piece, index) => <Square key={index} {...piece} />)
        ) : (
            <button className="button is-success" onClick={this.launchGame}>
            Start!
          </button>
        )}
      </div>
    );
  }
}

Board.propTypes = {
  pieces: PropTypes.array.isRequired
};

export default Board;
