import React from 'react'

import Hello from "./Hello";
import DynamicBoard from "../containers/DynamicBoard";
import DynamicScore from "../containers/DynamicScore";

const styles = {
  fontFamily: "sans-serif",
  fontSize: '8px'
};

const App = () => (
  <div style={styles}>
    {<Hello name="Tetris" />}
    <DynamicBoard />
    <DynamicScore />
  </div>
);

export default App