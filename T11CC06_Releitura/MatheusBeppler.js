const MB_sketch = (p) => {
  const MB_originalColors = {
    bg: '#262729',
    green: '#249547',
    orange: '#D0791E',
    blue: '#314AAF',
    red: '#B31C18',
    gray: '#C6C6BE'
  };

  let MB_currentColors = {};

  p.setup = () => {
    p.createCanvas(400, 400).parent('canvas-ob7');
    MB_currentColors = { ...MB_originalColors };
  };

  p.draw = () => {
    MB_updateColors();

    p.noStroke();

    p.fill(MB_currentColors.bg);
    p.rect(0, 0, 400, 400);

    p.fill(MB_currentColors.green);
    p.beginShape();
    p.vertex(207.5, 249.5);
    p.vertex(250.5, 193);
    p.vertex(400, 309.5);
    p.vertex(400, 398.5);
    p.endShape(p.CLOSE);

    p.fill(MB_currentColors.orange);
    p.beginShape();
    p.vertex(2, 399);
    p.vertex(151.5, 205);
    p.vertex(207.5, 249.5);
    p.vertex(90.5, 399);
    p.endShape(p.CLOSE);

    p.fill(MB_currentColors.blue);
    p.beginShape();
    p.vertex(250.5, 193);
    p.vertex(195, 149);
    p.vertex(311, 0);
    p.vertex(398.5, 0);
    p.endShape(p.CLOSE);

    p.fill(MB_currentColors.red);
    p.beginShape();
    p.vertex(195, 149);
    p.vertex(4.5, 0.5);
    p.vertex(0, 0.5);
    p.vertex(0, 87);
    p.vertex(151.5, 205);
    p.vertex(175.5, 175);
    p.endShape(p.CLOSE);

    p.fill(MB_currentColors.gray);
    p.beginShape();
    p.vertex(195, 149);
    p.vertex(250.5, 193);
    p.vertex(207.5, 249.5);
    p.vertex(151.5, 205);
    p.endShape(p.CLOSE);
  };

  function MB_updateColors() {
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const distToCenter = p.dist(p.mouseX, p.mouseY, centerX, centerY);
    const maxDist = p.dist(0, 0, centerX, centerY);
    const centerThreshold = 50;

    if (distToCenter < centerThreshold) {
      MB_currentColors = { ...MB_originalColors };
    } else {
      const normalizedDist = p.constrain(p.map(distToCenter, centerThreshold, maxDist, 0, 1), 0, 1);
      const angle = p.atan2(p.mouseY - centerY, p.mouseX - centerX);
      const hueShift = p.map(angle, -p.PI, p.PI, 0, 360);

      for (const key in MB_originalColors) {
        const col = p.color(MB_originalColors[key]);
        p.colorMode(p.HSB, 360, 100, 100);

        const h = p.hue(col);
        const s = p.saturation(col);
        const b = p.brightness(col);

        const newH = (h + hueShift * normalizedDist) % 360;
        const newS = p.constrain(s + (p.mouseX / p.width * 40 - 20) * normalizedDist, 0, 100);
        const newB = p.constrain(b + (p.mouseY / p.height * 40 - 20) * normalizedDist, 0, 100);

        MB_currentColors[key] = p.color(newH, newS, newB);
        p.colorMode(p.RGB);
      }
    }
  }
};

new p5(MB_sketch);
