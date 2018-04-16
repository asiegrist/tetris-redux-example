import * as Actions from "../actions";

const score = (state = 0, action) => {
  switch (action.type) {
    case Actions.VALIDATE_ROW:
      return state + 1000;
    default:
      return state;
  }
};

export default score;
