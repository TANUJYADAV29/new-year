const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let fireworksRunning = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 60;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Create explosion
function explode(x, y) {
  const colors = ["#ffcc00", "#ff4f9a", "#7c7cff", "#00ffd5", "#ffffff"];
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

// Auto fireworks
function randomFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  explode(x, y);
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}
animate();

// Auto fireworks interval
let autoFireworks = setInterval(() => {
  if (fireworksRunning) randomFirework();
}, 900);

// TAP / CLICK TO EXPLODE 🎆
canvas.addEventListener("click", (e) => {
  explode(e.clientX, e.clientY);
});

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  explode(touch.clientX, touch.clientY);
});

// Replay button support
function replayFireworks() {
  particles = [];
  fireworksRunning = true;
}
