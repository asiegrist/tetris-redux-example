import React from "react";

import Square from "./Square";

const Preview = ({ pieces }) => (
  <div>
    <h2 className="title subtitle">Next Piece:</h2>
    <div className="preview">
      {pieces.map((piece, index) => <Square key={index} {...piece} />)}
    </div>
  </div>
);

export default Preview;
