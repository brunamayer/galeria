let bolinhas = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  noStroke();

  colorMode(HSL); 
  gerarBolinhas();
}

function draw() {
  background(20); 

  let agora = millis();

  for (let b of bolinhas) {
    let d = dist(mouseX, mouseY, b.x, b.y);

    // Pintura com o mouse
    if (d < 20 && !b.pintada) {
      let hue = random(0, 360); 
      b.cor = color(hue, 90, 60);
      b.pintada = true;
      b.pintadaEm = agora;
    }

    // Reset após 7 segundos
    if (b.pintada && agora - b.pintadaEm > 7000) {
      b.cor = color(0, 0, 100); // branco
      b.pintada = false;
    }

    fill(b.cor);
    stroke(0);
    strokeWeight(3);
    ellipse(b.x, b.y, b.r * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gerarBolinhas();
}

function gerarBolinhas() {
  bolinhas = [];
  for (let i = 0; i < 150; i++) {
    let x = random(width);
    let y = (1 - pow(random(), 1.5)) * height;
    bolinhas.push({
      x,
      y,
      r: random(3, 25),
      cor: color(0, 0, 100), // branco
      pintada: false,
      pintadaEm: 0
    });
  }
}
