const HB_sketch = (p) => {
  let HB_blueScale = 1;
  let HB_grayScale = 1;
  let HB_yellowScale = 1;
  const HB_baseBlueSize = 320;
  const HB_baseGraySize = 240;
  const HB_baseYellowSize = 160;
  const HB_yOffset = 20;

  p.setup = () => {
    let HB_canvas = p.createCanvas(400, 400);
    HB_canvas.parent('canvas-ob1');
    p.colorMode(p.HSB, 360, 100, 100);
    p.rectMode(p.CENTER);
  };

  p.draw = () => {
    p.background(120, 50, 60);
    p.strokeWeight(3);
    for (let x = -p.height; x < p.width; x += 20) {
      let h = (p.frameCount * 0.5 + x * 0.3) % 360;
      p.stroke(h, 80, 90);
      p.line(x, 0, x + p.height, p.height);
    }
    p.noStroke();

    let HB_tBlue = (p.mouseX > 40 && p.mouseX < 360 && p.mouseY > 40 && p.mouseY < 360) ? 1.1 : 1;
    HB_blueScale = p.lerp(HB_blueScale, HB_tBlue, 0.1);
    let HB_bSize = HB_baseBlueSize * HB_blueScale;
    p.fill(200, 60, 70);
    p.rect(p.width / 2, p.height / 2 + HB_yOffset, HB_bSize, HB_bSize);

    let HB_tGray = (p.mouseX > 80 && p.mouseX < 320 && p.mouseY > 80 && p.mouseY < 320) ? 1.1 : 1;
    HB_grayScale = p.lerp(HB_grayScale, HB_tGray, 0.1);
    let HB_gSize = HB_baseGraySize * HB_grayScale;
    p.fill(0, 0, 70);
    p.rect(p.width / 2, p.height / 2 + HB_yOffset * 2, HB_gSize, HB_gSize);

    let HB_tYellow = (p.mouseX > 120 && p.mouseX < 280 && p.mouseY > 120 && p.mouseY < 280) ? 1.1 : 1;
    HB_yellowScale = p.lerp(HB_yellowScale, HB_tYellow, 0.1);
    let HB_ySize = HB_baseYellowSize * HB_yellowScale;
    p.fill(50, 80, 90);
    p.rect(p.width / 2, p.height / 2 + HB_yOffset * 3, HB_ySize, HB_ySize);
  };
};

new p5(HB_sketch);
