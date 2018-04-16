import * as Actions from "../actions";

const status = (state = "READY", action) => {
  switch (action.type) {
    case Actions.START_GAME:
      return "ONGOING";
    default:
      return state;
  }
};

export default status;
