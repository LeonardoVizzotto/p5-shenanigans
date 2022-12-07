import P5 from "p5";
import { CHAOS_CONFIG, createChaos } from "./engine";

const SIZE = 1000;
const ASPECT_RATIO = [16, 9];

const WIDTH = SIZE;
const HEIGTH = (ASPECT_RATIO[1] / ASPECT_RATIO[0]) * WIDTH;

const CENTER = [500, 240];
const R = 250;

const vertices: number[][] = [];
vertices.push([CENTER[0], HEIGTH - (CENTER[1] + R)]);
vertices.push([
  CENTER[0] + (R * Math.sqrt(3)) / 2,
  HEIGTH - (CENTER[1] - R / 2),
]);
vertices.push([
  CENTER[0] - (R * Math.sqrt(3)) / 2,
  HEIGTH - (CENTER[1] - R / 2),
]);

const triangleConfig: CHAOS_CONFIG = {
  VERTICES: vertices,
  getFirstPoint: (vertices) => {
    const A = vertices[0];
    const B = vertices[1];
    const C = vertices[2];
    const r1 = Math.random();
    const r2 = Math.random();

    const sqrtR1 = Math.sqrt(r1);

    const x =
      (1 - sqrtR1) * A[0] + sqrtR1 * (1 - r2) * B[0] + sqrtR1 * r2 * C[0];
    const y =
      (1 - sqrtR1) * A[1] + sqrtR1 * (1 - r2) * B[1] + sqrtR1 * r2 * C[1];

    return [x, y];
  },
  getNextVertex: (p5: P5, vertices) => p5.random(vertices),
};

export const triangle = {
  width: WIDTH,
  height: HEIGTH,
  draw: createChaos(triangleConfig).draw,
};
