import { connect } from 'react-redux'

import { getPreview } from "../reducers";
import Feedback from "../components/Feedback";

export default connect(
  state => ({
    score: state.score,
    preview: getPreview(state)
  }),
  {}
)(Feedback)