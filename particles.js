const canvas = document.getElementById("bgParticles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4
  });
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.fillStyle = "rgba(0,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
