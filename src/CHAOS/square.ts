import P5 from "p5";
import { CHAOS_CONFIG, createChaos } from "./engine";

const SIZE = 1000;
const ASPECT_RATIO = [16, 9];

const WIDTH = SIZE;
const HEIGTH = (ASPECT_RATIO[1] / ASPECT_RATIO[0]) * WIDTH;

const CENTER = [WIDTH / 2, HEIGTH / 2];
const SIDE = 500;

const vertices: number[][] = [];
vertices.push([CENTER[0] - SIDE / 2, CENTER[1] - SIDE / 2]);
vertices.push([CENTER[0] - SIDE / 2, CENTER[1] + SIDE / 2]);
vertices.push([CENTER[0] + SIDE / 2, CENTER[1] - SIDE / 2]);
vertices.push([CENTER[0] + SIDE / 2, CENTER[1] + SIDE / 2]);

const squareConfig: CHAOS_CONFIG = {
  VERTICES: vertices,
  getFirstPoint: (vertices) => {
    const v1 = vertices[0];
    const v2 = vertices[3];
    const x = Math.floor(Math.random() * (v2[0] - v1[0] + 1) + v1[0]);
    const y = Math.floor(Math.random() * (v2[1] - v1[1] + 1) + v1[1]);

    return [x, y];
  },
  getNextVertex: (p5: P5, vertices, lastVertex) => {
    let vertex;
    while (!vertex || vertex === lastVertex) {
      vertex = p5.random(vertices);
    }
    return vertex;
  },
};

export const square = {
  width: WIDTH,
  height: HEIGTH,
  draw: createChaos(squareConfig).draw,
};
