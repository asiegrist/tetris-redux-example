import {connect} from 'react-redux'

import Score from "../components/Score";

export default connect(
  state => ({
    score: state.score
  }),
  {}
)(Score)