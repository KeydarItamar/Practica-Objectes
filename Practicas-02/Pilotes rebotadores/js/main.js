// import { Pilota } from "./pilota.js";

class Pilota {
  constructor(x, y, velX, velY, color, mida) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.mida = mida;
  }

  dibuixa(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI);
    ctx.fill();
  }

  mou(width, height) {
    if (this.x + this.mida > width || this.x - this.mida < 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.mida > height || this.y - this.mida < 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

let creacion= 0;
const pilotes = [];

function loop() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

   if (creacion == 0){
    for (let i = 0; i < 25; i++) {
      const mida = random(10, 20);
      const x = random(mida, width - mida);
      const y = random(mida, height - mida);
      const velX = random(-5, 5);
      const velY = random(-5, 5);
      const color = randomRGB();

      pilotes.push(new Pilota(x, y, velX, velY, color, mida));
     }
  }

  creacion = 1
  for (const pilota of pilotes) {
    pilota.dibuixa(ctx);
    pilota.mou(width, height);
  }

  requestAnimationFrame(loop);
}

// Llamar a la función loop para iniciar la animación
loop();
