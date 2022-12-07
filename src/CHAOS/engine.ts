import P5 from "p5";

export interface CHAOS_CONFIG {
  FACTOR?: number;
  VERTICES: number[][];
  getFirstPoint: (vertices: number[][]) => number[];
  getNextVertex: (
    p5: P5,
    vertices: number[][],
    lastVertex: number[]
  ) => number[];
}

export function createChaos(config: CHAOS_CONFIG) {
  const FACTOR = config.FACTOR || 1 / 2;
  const vertices = config.VERTICES;

  let lastPoint = config.getFirstPoint(vertices);
  let lastVertex;

  const draw = (p5: P5) => {
    vertices.forEach((v) => p5.set(v[0], v[1], p5.point(0, 0, 0)));
    p5.set(lastPoint[0], lastPoint[1], p5.color(0, 0, 0));

    const vertex = config.getNextVertex(p5, vertices, lastVertex);
    lastVertex = vertex;

    const x = (vertex[0] + lastPoint[0]) * FACTOR;
    const y = (vertex[1] + lastPoint[1]) * FACTOR;

    lastPoint = [x, y];
    p5.point(x, y);
  };

  return { draw };
}
