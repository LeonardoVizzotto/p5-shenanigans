import P5 from "p5";
import "p5/lib/addons/p5.dom";
import kmeans from "node-kmeans";

export const sketch = (p5: P5) => {
  let img: P5.Image;

  p5.preload = () => {
    img = p5.loadImage(require("./portrait.JPG"));
  };

  p5.setup = async () => {
    img.resize(0, 700);
    img.loadPixels();
    p5.loadPixels();
    p5.pixelDensity(img["_pixelDensity"]);

    const canvas = p5.createCanvas(img.width, img.height);
    canvas.parent("app");

    let colors: number[][] = [];

    for (let w = 0; w < p5.width; w++) {
      for (let h = 0; h < p5.height; h++) {
        colors.push(img.get(w, h));
      }
    }

    colors.forEach((c) => {
      let max = Math.max(c[0], c[1], c[2]);
      let min = Math.min(c[0], c[1], c[2]);
      c[c.findIndex((i) => i === max)] *= 1.6;
      c[c.findIndex((i) => i === min)] *= .4;
    });

    let centroids: any[] = [];

    let semaforo: Promise<void> = new Promise((resolve, reject) => {
      kmeans.clusterize(colors, { k: 16 }, (err, res) => {
        centroids = res;
        resolve();
      });
    });

    await semaforo;
    console.log(centroids);

    for (let w = 0; w < p5.width; w++) {
      for (let h = 0; h < p5.height; h++) {
        const color = centroids.find(({ clusterInd }) =>
          clusterInd.includes(w * p5.height + h)
        ).centroid;
        img.set(w, h, color);
      }
    }

	img.loadPixels()

	img.resize(0, 40);
    img.resize(0, 700);

	for (let w = 0; w < p5.width; w++) {
		for (let h = 0; h < p5.height; h++) {
		  p5.set(w, h, img.get(w, h));
		}
	  }

    p5.updatePixels();
  };

  p5.draw = () => {};
};
