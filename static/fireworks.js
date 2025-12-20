const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// ================= FIREWORK ENGINE =================

let shells = [];
let sparks = [];

class Shell {
  constructor(x) {
    this.x = x;
    this.y = canvas.height;
    this.vy = -Math.random() * 6 - 8;
    this.exploded = false;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }

  update() {
    this.y += this.vy;
    this.vy += 0.15;

    if (this.vy >= 0 && !this.exploded) {
      this.exploded = true;
      explode(this.x, this.y, this.color);
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 3, 10);
  }
}

class Spark {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 60;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.life--;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

function explode(x, y, color) {
  for (let i = 0; i < 80; i++) {
    sparks.push(new Spark(x, y, color));
  }
}

function launchShell(x = Math.random() * canvas.width) {
  shells.push(new Shell(x));
}

function animate() {
  ctx.fillStyle = "rgba(20, 0, 40, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shells.forEach((s, i) => {
    s.update();
    s.draw();
    if (s.exploded) shells.splice(i, 1);
  });

  sparks.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) sparks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

// AUTO FIRE
setInterval(() => launchShell(), 900);

// TAP / CLICK TO EXPLODE
window.addEventListener("click", e => {
  launchShell(e.clientX);
});

// REPLAY BUTTON
function restartFireworks() {
  shells = [];
  sparks = [];
}

animate();
