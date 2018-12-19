import React, { Component } from 'react';
import HexagonGrid from "./HexagonGrid.js";
import exampleData from "./exampleData"
import exampleDims from "./exampleGridDims"


class App extends Component {
  render() {
    return (
      <div style={{height: '100%', width: "100%", position: "fixed", display: "flex"}} >
        <HexagonGrid nHexCols={exampleDims.nHexCols} nHexRows={exampleDims.nHexRows} hexagons={exampleData}/>
      </div>
    );
  }
}

export default App;
