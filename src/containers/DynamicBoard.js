import { connect } from "react-redux";
import * as piecesActionsCreators from "../actions";
import { getAllPieces } from "../reducers";

import Board from "../components/Board";

export default connect(
  state => ({
    pieces: getAllPieces(state),
    status: state.status
  }),
  piecesActionsCreators
)(Board);
