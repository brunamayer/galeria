const GV_sketch = (p) => {
  let GV_slider;

  p.setup = () => {
    const canvasSize = 400;

    // Cria div para agrupar canvas + slider
    const wrapper = p.createDiv().id('gv-wrapper');
    wrapper.parent('canvas-ob8');
    wrapper.style('width', canvasSize + 'px');
    wrapper.style('margin', '0 auto');
    wrapper.style('display', 'flex');
    wrapper.style('flex-direction', 'column');
    wrapper.style('align-items', 'center');
    wrapper.style('gap', '12px');

    // Cria canvas
    const canvas = p.createCanvas(canvasSize, canvasSize);
    canvas.parent(wrapper);

    // Cria slider
    GV_slider = p.createSlider(0, 1, 0.5, 0.01);
    GV_slider.parent(wrapper);
    GV_slider.style('width', canvasSize + 'px');
  };

  p.draw = () => {
    p.background(0);
    const t = GV_slider.value();

    let cx = p.width / 2;
    let cy = p.height / 2;

    let black_inner = p.color(255, 190, 0);
    let black_mid = p.color(255, 60, 0);
    let black_outer = p.color(100, 10, 0);

    let white_inner = p.color(180, 220, 255);
    let white_mid = p.color(100, 160, 255);
    let white_outer = p.color(20, 50, 100);

    let inner = p.lerpColor(black_inner, white_inner, t);
    let mid = p.lerpColor(black_mid, white_mid, t);
    let outer = p.lerpColor(black_outer, white_outer, t);

    let maxRadius = p.width * 0.45;
    let midRadius = p.width * 0.35;
    let minRadius = p.width * 0.25;
    let centerRadius = p.width * 0.2;

    for (let r = maxRadius; r > minRadius; r -= p.width * 0.00125) {
      let inter, c;
      if (r > midRadius + (maxRadius - midRadius) * 0.5) {
        inter = p.map(r, maxRadius, midRadius + (maxRadius - midRadius) * 0.5, 0, 1);
        c = p.lerpColor(p.color(0), outer, inter);
      } else if (r > midRadius) {
        inter = p.map(r, midRadius + (maxRadius - midRadius) * 0.5, midRadius, 0, 1);
        c = p.lerpColor(outer, mid, inter);
      } else {
        inter = p.map(r, midRadius, minRadius, 0, 1);
        c = p.lerpColor(mid, inner, inter);
      }

      p.noStroke();
      p.fill(c);
      p.ellipse(cx, cy, r * 2, r * 2);
    }

    const centerColor = p.lerpColor(p.color(0), p.color(255), t);
    p.fill(centerColor);
    p.noStroke();
    p.ellipse(cx, cy, centerRadius * 2, centerRadius * 2);
  };
};

new p5(GV_sketch);
