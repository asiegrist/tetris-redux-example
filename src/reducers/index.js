import { combineReducers } from 'redux'
import R from 'ramda'
import * as BOARD from '../constants/board'

import pieces from './pieces'
import score from "./score";
import status from "./status";

const rootReducer = combineReducers({
  pieces,
  score,
  status,
})

export const getAllPieces = state => {
  const pieces = R.map(square => ({
    ...square,
    top: square.top * BOARD.squareEdge,
    left: square.left * BOARD.squareEdge
  }))(state.pieces);

  return R.dropLast(4)(pieces);
};

export const getPreview = state => {
  const pieces = R.map(square => ({
    ...square,
    top: square.top * BOARD.squareEdge,
    left: square.left * BOARD.squareEdge - 50
  }))(R.takeLast(4)(state.pieces));
  
  return pieces;
};


export default rootReducer