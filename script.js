// script.js
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
const numDots = 100;
const maxDistance = 150;

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Create a Dot class
class Dot {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.dx = Math.random()  - 1; // Horizontal speed
        this.dy = Math.random()  - 1; // Vertical speed
        this.opacity = Math.random();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Reverse direction if dot hits the edges
        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        this.opacity = Math.max(0.1, this.opacity - 0.005); // Slowly fade
    }
}

// Initialize dots
for (let i = 0; i < numDots; i++) {
    dots.push(new Dot());
}

// Draw connecting lines between close dots
function drawLines() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const distance = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// Animate the canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });

    drawLines();

    // Add new dots if opacity fades
    dots = dots.filter(dot => dot.opacity > 0.1);

    while (dots.length < numDots) {
        dots.push(new Dot());
    }

    requestAnimationFrame(animate);
}

// Start animation
animate();
