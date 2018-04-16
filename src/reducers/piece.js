import R from "ramda";
import * as Actions from "../actions";

const rotate = (center, square) => {
  const top = square.left - center.left + center.top;
  const left = center.top - square.top + center.left;
  return { ...square, top, left };
};

const piece = (state = [], action) => {
  switch (action.type) {
    case Actions.CREATE_PIECE:
      return action.composition.map(square => ({
        ...square,
        color: action.color
      }));
    case Actions.IMMOBILIZE_PIECE:
      return [];
    case Actions.MOVE_PIECE_DOWN:
      return state.map(square => ({
        ...square,
        top: square.top + 1
      }));
    case Actions.MOVE_PIECE:
      return state.map(square => ({
        ...square,
        left: square.left + action.left
      }));
    case Actions.ROTATE_PIECE:
      const center = R.find(R.prop("isCenter"), state);
      return R.map(R.curry(rotate)(center), state);
    default:
      return state;
  }
};

export default piece;
