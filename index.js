const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set of atoms displayed
let set = [];

const counterElement = document.getElementById("counter");

canvas.addEventListener('click', (e) => {
    for(let i = 0; i < 20; i++){
        set.push(new Atom(e.clientX, e.clientY));
    }
    updateCounter();
})

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
    constructor (x, y){
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 8 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = "white";
    }

    update (){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkBoundaries (){
        this.speedX *= - 1;
        this.speedY *= - 1;
    }

    draw (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function updateCounter() {
    counterElement.textContent = `Atoms: ${set.length}`;
}