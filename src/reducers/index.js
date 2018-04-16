import { combineReducers } from "redux";
import * as BOARD from "../constants/board";

import piece from "./piece";
import grid from "./grid";
import score from "./score";
import status from "./status";

const rootReducer = combineReducers({
  piece,
  grid,
  score,
  status
});

export const getAllPieces = state => {
  const grid = state.grid.reduce((acc, line, row) => {
    return line.reduce((acc, square, column) => {
      acc.push({
        ...square,
        top: row * BOARD.squareEdge,
        left: column * BOARD.squareEdge
      });

      return acc;
    }, acc);
  }, []);

  const piece = state.piece.map(square => ({
    ...square,
    top: square.top * BOARD.squareEdge,
    left: square.left * BOARD.squareEdge
  }));

  return grid.concat(piece);
};

export default rootReducer;
