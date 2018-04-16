import React from "react";
import PropTypes from "prop-types";

const Square = props => {
  let styling = {
    top: props.top,
    left: props.left,
    backgroundColor: props.color
  };

  return <div className="square" style={styling} />;
};

Square.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  color: PropTypes.string
};

Square.defaultProps = {
  color: 'green'
}

export default Square;
