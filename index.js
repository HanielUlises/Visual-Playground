const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set of atoms displayed
let set = [];

const counterElement = document.getElementById("live-text");
const increaseSpeedButton = document.querySelector(".speedButtons button:nth-child(1)");
const decreaseSpeedButton = document.querySelector(".speedButtons button:nth-child(2)");

canvas.addEventListener('click', (e) => {
    for(let i = 0; i < 20; i++){
        set.push(new Atom(e.clientX, e.clientY));
    }
    updateCounter();
})

increaseSpeedButton.addEventListener('click', () => {
    set.forEach((atom) => {
        atom.increaseSpeed();
    });
});

decreaseSpeedButton.addEventListener('click', () => {
    set.forEach((atom) => {
        atom.decreaseSpeed();
    });
});

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    set.forEach((atom, index) => {
        atom.draw();
        atom.update();

        if (atom.x < 0 || atom.x > canvas.width || atom.y < 0 || atom.y > canvas.height) {
            atom.checkBoundaries();
        }

    })

    requestAnimationFrame(animate);
}

animate();

class Atom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 8 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkBoundaries() {
        this.speedX *= -1;
        this.speedY *= -1;
    }

    increaseSpeed() {
        this.speedX *= 1.1;
        this.speedY *= 1.1;
    }

    decreaseSpeed() {
        this.speedX /= 1.1;
        this.speedY /= 1.1;
    }

    draw() {
        const distance = this.distanceFromCenter();
        this.color = this.updateColor(distance);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    distanceFromCenter() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        return Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2);
    }

    updateColor(distance) {
        const maxDistance = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
        const normalizedDistance = distance / maxDistance;
        const backgroundColor = { r: 40, g: 40, b: 40 }; // Update with your background color

        const color = {
            r: Math.floor(255 - normalizedDistance * (255 - backgroundColor.r)),
            g: Math.floor(255 - normalizedDistance * (255 - backgroundColor.g)),
            b: Math.floor(255 - normalizedDistance * (255 - backgroundColor.b))
        };

        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
}

function updateCounter() {
    counterElement.textContent = `Atoms: ${set.length}`;
}