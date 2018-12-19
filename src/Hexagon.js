import { extendHex } from 'honeycomb-grid'
import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Hexagon";
//API to create a custom pixi component with react-pixi-fiber.
export const componentBehavior = {
    customDisplayObject: props => new PIXI.Graphics(),

    customApplyProps: function(instance, oldProps, newProps) {
        const { x, y, color, size, offset } = newProps;

        // Make a hexagon.
        const Hex = extendHex({size: size})
        const hex = Hex(x, y, {color: color})

        // Grab the pixel coordinates for each corner of the hexagon.
        const point = hex.toPoint()
        let corners = hex.corners().map(
            corner => [corner.add(point).x + offset.x, corner.add(point).y + offset.y]
        )

        // Get ready for pixi's drawPolygon API. (flatten array)
        corners = Array.prototype.concat.apply([],corners)

        // Draw with pixi
        instance.clear()
        instance.beginFill(color)
        instance.drawPolygon(corners)
        instance.endFill();
    }
};

export default CustomPIXIComponent(componentBehavior, TYPE);
