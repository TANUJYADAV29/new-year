const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

function explode(x, y) {
  for (let i = 0; i < 40; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 80,
      color: `hsl(${Math.random() * 360},100%,65%)`
    });
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(loop);
}
loop();

/* AUTO FIREWORKS */
setInterval(() => {
  explode(
    Math.random() * canvas.width,
    Math.random() * canvas.height * 0.6
  );
}, 1200);

/* TAP / CLICK FIREWORK */
canvas.addEventListener("click", e => {
  explode(e.clientX, e.clientY);
});

/* REPLAY */
function replayFireworks() {
  particles = [];
}
