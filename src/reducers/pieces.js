import R from "ramda";
import * as Actions from "../actions";

import piece from "./piece";

const init = [];

const pieces = (state = [], action) => {
  switch (action.type) {
    case Actions.CREATE_PIECE:
      return [...state, ...action.composition];
    case Actions.MOVE_PIECE:
    case Actions.ROTATE_PIECE:
      return [
        ...state.slice(0, -8),
        ...piece(action.piece, action),
        ...state.slice(-4)
      ];
    case Actions.VALIDATE_ROW:
      const splitSquareToAdjustFromGrid = R.pipe(
        R.dropLast(4),
        R.without(action.pieces),
        R.partition(square => square.top < action.row)
      );

      const [toAdjust, grid] = splitSquareToAdjustFromGrid(state);
      const adjusted = R.map(square => ({ ...square, top: square.top + 1 }))(
        toAdjust
      );
      return [...grid, ...adjusted, ...state.slice(-4)];
    default:
      return state;
  }
};

export default pieces;
