import R from "ramda";
import { maxTop, maxLeft } from "../constants/board";
import * as Actions from "../actions";

let initialState = R.map(() => new Array(maxLeft), new Array(maxTop));
/*initialState[1][3] = { color: "gold" };
//initialState[5][6] = { color: "blue" };
initialState[maxTop - 1][maxLeft - 1] = { color: "blue" };
initialState[maxTop - 1][0] = { color: "blue" };
initialState[maxTop - 1][1] = { color: "blue" };
initialState[maxTop - 1][2] = { color: "blue" };
initialState[maxTop - 1][3] = { color: "blue" };
initialState[maxTop - 1][4] = { color: "blue" };
initialState[maxTop - 1][maxLeft - 5] = { color: "blue" };
initialState[maxTop - 1][maxLeft - 4] = { color: "blue" };
initialState[maxTop - 1][maxLeft - 3] = { color: "blue" };
initialState[maxTop - 1][maxLeft - 2] = { color: "blue" };
initialState[maxTop - 1][maxLeft - 1] = { color: "blue" };*/

function grid(state = initialState, action) {
  switch (action.type) {
    case Actions.IMMOBILIZE_PIECE:
      return R.reduce(setValue, state, action.piece)
    case Actions.VALIDATE_ROW:
      return [
        new Array(maxLeft),
        ...state.slice(0, action.row),
        ...state.slice(action.row + 1)
      ]
    default:
      return state;
  }
}

const setValue = (state, square) => {
  const {top: row, left: column} = square
  const value = R.omit(['top', 'left'], square)

  const lens = R.lensPath([row, column]);
  return R.set(lens, value, state);
};

export default grid;
