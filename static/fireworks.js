const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let interval;

const colors = ["#ffbe0b", "#ff006e", "#8338ec", "#3a86ff"];

function launchFireworks() {
  interval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7,
        life: 90,
        color
      });
    }
  }, 900);
}

function replayFireworks() {
  clearInterval(interval);
  particles = [];
  launchFireworks();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 3, 3);
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
  });

  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(animate);
}

launchFireworks();
animate();
