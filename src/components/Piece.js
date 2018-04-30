import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";

const Piece = ({ composition }) => {
  return (
    <span>
      {/*composition.map((square, index) => <Square key={index} {...square} />)*/}
    </span>
  );
};

Piece.propTypes = {
  composition: PropTypes.array.isRequired
};

export default Piece;
