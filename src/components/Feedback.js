import React from "react";

import Score from "../components/Score";
import Preview from "../components/Preview";

const Feedback = props => (
  <div>
    <Score score={props.score} />
    <Preview pieces={props.preview} />
  </div>
);

export default Feedback;
