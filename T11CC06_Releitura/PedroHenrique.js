// -------- Sketch estático --------
const staticSketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400).parent('p5_static');
    p.noLoop();
  };

  p.draw = () => {
    p.background(255);
    p.noStroke();

    const n = 10;
    let col_alternator = 1;
    let pos_alternator = 1;
    let x = 10;
    let y = 0;

    for (let i = 0; i <= n; i++) {
      y = pos_alternator > 0 ? -20 : 420;

      for (let j = 0; j < 3 * n; j++) {
        p.fill(col_alternator > 0 ? 255 : 0);
        y += pos_alternator * (400 / (2.5 * n));
        p.circle(x, y, 400 / n);
        col_alternator *= -1;
      }

      x += 400 / (1.035 * n);
      col_alternator *= -1;
      pos_alternator *= -1;
    }
  };
};

// -------- Sketch animado em onda --------
const waveSketch = (p) => {
  let n = 10;
  let amplitude = 20;
  let speed = 0.1;
  let phaseStep;

  p.setup = () => {
    p.createCanvas(400, 400).parent('p5_wave');
    phaseStep = p.PI / 6;
  };

  p.draw = () => {
    p.background(255);
    p.noStroke();
    let t = p.frameCount * speed;

    for (let i = 0; i <= n; i++) {
      let baseX = 10 + i * (400 / (1.035 * n));
      let dx = amplitude * p.sin(t - i * phaseStep);
      let x = baseX + dx;

      let colAlt = (i % 2 === 0) ? 1 : -1;
      let posAlt = (i % 2 === 0) ? 1 : -1;
      let y = posAlt > 0 ? -20 : p.height + 20;

      for (let j = 0; j < 3 * n; j++) {
        p.fill(colAlt > 0 ? 255 : 0);
        y += posAlt * (p.height / (2.5 * n));
        p.circle(x, y, p.width / n);
        colAlt *= -1;
      }
    }
  };
};

// Inicializar os dois sketches com identificadores diferentes
new p5(staticSketch);
new p5(waveSketch);
