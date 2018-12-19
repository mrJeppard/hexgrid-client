/*
Hexagon grid component rendered with Pixi.js. Responds sensibly to window resizing by adjusting hexagon size
and maintaining the grid in the center of the rendering area.
 */
import React from 'react'
import Dimensions from 'react-dimensions'
import { Stage } from "react-pixi-fiber";
import Hexagon from "./Hexagon";

// Options for the rendering area.
const OPTIONS = {
    backgroundColor: 0x1099bb,
};

class HexagonGrid extends React.Component {
    render() {
        const { hexagons, containerWidth, containerHeight, nHexCols, nHexRows } = this.props;
        // The grid is rendered in the center of the rendering area, and a hexagon size is chosen so
        // all the hexagons are visible.
        const emptySpace = .05 
        const maxGridWidth = containerWidth - (2 * containerWidth * emptySpace)
        const maxGridHeight = containerHeight - (2 * containerHeight * emptySpace)

        let hexSize, offset
        // The height and width of the hexagon grid in pixels.
        let pixelHeight, pixelWidth

        // Find the correct hexagon size and offset for the grid.
        // Scaling to the smaller hexagon size guarantees all hexagons will be visible.
        if (heightScaledHexSize(maxGridHeight, nHexRows) < widthScaledHexSize(maxGridWidth, nHexCols)) {
            pixelHeight = maxGridHeight
            hexSize = heightScaledHexSize(pixelHeight, nHexRows)
            pixelWidth = gridWidth(hexSize, nHexCols)
            offset = gridOffset(containerHeight, containerWidth, pixelHeight, pixelWidth)
        } else {
            pixelWidth = maxGridWidth
            hexSize = widthScaledHexSize(pixelWidth, nHexCols)
            pixelHeight = gridHeight(hexSize, nHexRows)
            offset = gridOffset(containerHeight, containerWidth, pixelHeight, pixelWidth)
        }

        return <Stage width={containerWidth} height={containerHeight} options={OPTIONS}>
            {hexagons.map( (point, i) => <Hexagon x={point.x} y={point.y} size={hexSize} offset={offset} key={i}/> )}
        </Stage>

    }
}

// Higher Order component used to pass the dimensions of the div into the HexagonGrid
export default Dimensions()(HexagonGrid)

function gridWidth(hexSize, nHexCols){
    // Find the pixel width of a hexagon grid.
    return (nHexCols + 1) * Math.sqrt(3) * hexSize
}

function gridHeight(hexSize, nHexRows){
    // Find the pixel height of a hexagon grid.
    return (3/4) * 2 * hexSize * nHexRows
}

function heightScaledHexSize(pixelHeight, nHexRows){
    // Return the hexagon size in pixels when scaling the hexagon grid into the container vertically.
    return (pixelHeight / (nHexRows * .75)) / 2
}

function widthScaledHexSize(pixelWidth, nHexCols){
    // Return the hexagon size in pixels when scaling the hexagon grid into the container horizontally.
    return pixelWidth / ((nHexCols + 1) * Math.sqrt(3))
}

function gridOffset(containerHeight, containerWidth, hexPixelHeight, hexPixelWidth){
    // Find the proper offset to place the grid in the middle of the rendering area.
    return {
        x:  (containerWidth - hexPixelWidth) / 2,
        y:  (containerHeight - hexPixelHeight) / 2
    }
}
