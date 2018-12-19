import React from 'react';

import { Sprite } from "react-pixi-fiber";
import hexagon from "./hexagon.png";
import * as PIXI from "pixi.js";

const original_h = 204
const original_w = 178

function Hexagon(props) {
    let {x, y, scale} = props
    const offset_x = y % 2 ? (original_w  * scale * 0.5) - (x * 3 * scale)  : - (x * 3 * scale)
    const offset_y = (y * -.25 * original_h * scale)
    const x_pos = (x * original_w * scale) + offset_x
    const y_pos = (y * original_h * scale) + offset_y
    return (
        <Sprite texture={PIXI.Texture.fromImage(hexagon)} tint={0xFF0000} scale={scale} x={x_pos} y={y_pos} />
    );
}

export default Hexagon;