const LO_sketch = (p) => {
  let LO_colors, LO_grayColors;

  p.setup = () => {
    p.createCanvas(400, 400).parent('canvas-ob6');
    p.noStroke();

    LO_colors = ['#3E1E61', '#273F27', '#2CA9A3', '#2CA199', '#4DA840', '#213824', '#49A43B'];
    LO_grayColors = LO_colors.map(c => {
      let col = p.color(c);
      let g = p.round(p.red(col) * 0.299 + p.green(col) * 0.587 + p.blue(col) * 0.114);
      return p.color(g);
    });
  };

  p.draw = () => {
    p.background(217);

    let t = p.constrain(p.mouseX / p.width, 0, 1);

    p.fill(p.lerpColor(LO_grayColors[0], p.color(LO_colors[0]), t));
    p.rect(27, 27, 345, 345);

    p.fill(p.lerpColor(LO_grayColors[1], p.color(LO_colors[1]), t));
    p.beginShape();
    p.vertex(195.5, 36);
    p.vertex(27, 206.5);
    p.vertex(27, 372);
    p.endShape(p.CLOSE);

    p.fill(p.lerpColor(LO_grayColors[2], p.color(LO_colors[2]), t));
    p.beginShape();
    p.vertex(110.5, 205);
    p.vertex(27, 372);
    p.vertex(194, 372);
    p.endShape(p.CLOSE);

    p.fill(p.lerpColor(LO_grayColors[3], p.color(LO_colors[3]), t));
    p.beginShape();
    p.vertex(371.5, 199.991);
    p.vertex(195.5, 372);
    p.vertex(371.5, 30);
    p.endShape(p.CLOSE);

    p.fill(p.lerpColor(LO_grayColors[4], p.color(LO_colors[4]), t));
    p.beginShape();
    p.vertex(194, 39);
    p.vertex(194, 372);
    p.vertex(110, 204.512);
    p.endShape(p.CLOSE);

    p.fill(p.lerpColor(LO_grayColors[5], p.color(LO_colors[5]), t));
    p.beginShape();
    p.vertex(282.965, 27);
    p.vertex(196, 372);
    p.vertex(372, 27);
    p.endShape(p.CLOSE);

    p.fill(p.lerpColor(LO_grayColors[6], p.color(LO_colors[6]), t));
    p.beginShape();
    p.vertex(372, 372);
    p.vertex(194, 372);
    p.vertex(372, 194);
    p.endShape(p.CLOSE);
  };
};

new p5(LO_sketch);
