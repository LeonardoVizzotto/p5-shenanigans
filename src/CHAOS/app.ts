import P5 from "p5";
import "p5/lib/addons/p5.dom";
import { triangle } from "./triangle";

export const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(triangle.width, triangle.height);
    canvas.parent("app");

    p5.background("white");
    p5.strokeWeight(2);
  };

  p5.draw = () => {
    triangle.draw(p5);
  };
};
