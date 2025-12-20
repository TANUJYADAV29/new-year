const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let rockets = [];
let particles = [];

/* ROCKET */
class Rocket {
  constructor(x) {
    this.x = x;
    this.y = canvas.height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -(Math.random() * 7 + 10);
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
    this.exploded = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.08;

    // trail
    particles.push(new Particle(this.x, this.y, this.color, true));

    if (this.vy >= 0 && !this.exploded) {
      this.explode();
      this.exploded = true;
    }
  }

  explode() {
    const count = 60;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 4 + 2;
      particles.push(
        new Particle(
          this.x,
          this.y,
          this.color,
          false,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        )
      );
    }
  }
}

/* PARTICLE */
class Particle {
  constructor(x, y, color, trail = false, vx = 0, vy = 0) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.life = trail ? 20 : 80;
    this.color = color;
    this.trail = trail;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (!this.trail) this.vy += 0.05;
    this.life--;
    this.alpha -= this.trail ? 0.05 : 0.012;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.trail ? 1.8 : 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* LOOP */
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rockets.forEach((r, i) => {
    r.update();
    if (r.exploded) rockets.splice(i, 1);
  });

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

/* AUTO FIREWORKS */
setInterval(() => {
  rockets.push(new Rocket(Math.random() * canvas.width));
}, 1200);

/* TAP / CLICK TO EXPLODE */
canvas.addEventListener("click", e => {
  const r = new Rocket(e.clientX);
  r.y = e.clientY;
  r.vy = -8;
  rockets.push(r);
});

/* REPLAY */
function replayFireworks() {
  rockets = [];
  particles = [];
}
