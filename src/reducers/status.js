import * as Actions from "../actions";

const status = (state = "READY", action) => {
  switch (action.type) {
    case Actions.START_GAME:
      return "ONGOING";
    case Actions.STOP_GAME:
      return "GAMEOVER";
    default:
      return state;
  }
};

export default status;
