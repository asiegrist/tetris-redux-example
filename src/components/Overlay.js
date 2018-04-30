import React from "react";

const Overlay = ({ status, onClick, score }) => (
  <span>
    {status === "READY" ? (
      <button className="button is-success" onClick={onClick}>
        Start!
      </button>
    ) : (
      <div>
        <h2 className="title subtitle">GAME OVER!</h2>
        <button className="button is-success" onClick={onClick}>
          Start!
        </button>
      </div>
    )}
  </span>
);

export default Overlay;
