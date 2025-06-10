const yanomaSketch = (p) => {
  const colors = [
    [230, 230, 200], 
    [45, 115, 115],  
    [255, 220, 0],   
    [215, 180, 80],  
    [90, 60, 15]     
  ];

  const originalSizes = [400, 350, 250, 180, 100];
  let squares = [];

  let cycleTimer = 0;
  const cycleDuration = 600; 
  let returningToOriginal = false;
  let resetSpeed = 0.05; 

  p.setup = () => {
    p.createCanvas(600, 600).parent('canvas-ob9');
    p.rectMode(p.CENTER);
    p.noStroke();

    for (let i = 0; i < colors.length; i++) {
      squares.push({
        baseSize: originalSizes[i],
        scale: 1.0,
        scaleSpeed: p.random(0.003, 0.008) * (p.random() > 0.5 ? 1 : -1),
        minScale: p.random(0.7, 0.9),
        maxScale: p.random(1.1, 1.4),
        rotation: 0,
        rotationSpeed: p.random(-0.003, 0.003),
        offsetX: 0,
        offsetY: 0,
        offsetSpeedX: p.random(-0.7, 0.7),
        offsetSpeedY: p.random(-0.7, 0.7),
        originalScale: 1.0,
        originalRotation: 0,
        originalOffsetX: 0,
        originalOffsetY: 0
      });
    }
  };

  p.draw = () => {
    p.background(25);
    p.translate(p.width / 2, p.height / 2);

    cycleTimer++;
    if (cycleTimer >= cycleDuration) {
      returningToOriginal = !returningToOriginal;
      cycleTimer = 0;
    }

    for (let i = 0; i < colors.length; i++) {
      const sq = squares[i];

      if (returningToOriginal) {
        sq.scale = p.lerp(sq.scale, sq.originalScale, resetSpeed);
        sq.rotation = p.lerp(sq.rotation, sq.originalRotation, resetSpeed);
        sq.offsetX = p.lerp(sq.offsetX, sq.originalOffsetX, resetSpeed);
        sq.offsetY = p.lerp(sq.offsetY, sq.originalOffsetY, resetSpeed);
      } else {
        sq.scale += sq.scaleSpeed;
        if (sq.scale <= sq.minScale || sq.scale >= sq.maxScale) {
          sq.scaleSpeed *= -1;
        }

        sq.rotation += sq.rotationSpeed;
        sq.offsetX += sq.offsetSpeedX;
        sq.offsetY += sq.offsetSpeedY;

        const maxOffset = 40;
        if (Math.abs(sq.offsetX) > maxOffset) sq.offsetSpeedX *= -1;
        if (Math.abs(sq.offsetY) > maxOffset) sq.offsetSpeedY *= -1;
      }

      p.push();
      p.translate(sq.offsetX, sq.offsetY);
      p.rotate(sq.rotation);

      if (!returningToOriginal) {
        let distortion = p.sin(p.frameCount * 0.02 + i * 0.5) * 0.04;
        p.shearX(distortion);
      }

      p.fill(colors[i]);
      const size = sq.baseSize * sq.scale;
      p.rect(0, 0, size, size);
      p.pop();
    }

    p.push();
    p.fill(255);
    p.textAlign(p.CENTER);
    p.textSize(14);
    const stateText = returningToOriginal ? "Retornando ao Original" : "Modo Expressionista";
    p.text(stateText, 0, p.height / 2 - 30);
    p.pop();
  };
};

new p5(yanomaSketch);
