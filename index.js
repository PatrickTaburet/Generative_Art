
// ---------------Random Line Generator

// function vraiOuFaux(){
//     let random = Math.floor(Math.random() * 2);
//     if (random == 0){
//         return "faux";
//     } else{
//         return "vrai"
//     }
// }

// function dessine(x, y, pas) {
//     let mainCanvas = document.getElementById("canvas");
//     if (mainCanvas.getContext) {
//         const ctx = canvas.getContext("2d");

//         for (let i = 0; i < 300; i += pas) {
//            for (let j = 0; j < 150; j += pas) {
//              const xActuel = x + i;
//              const yActuel = y + j;
        
//              // Vérifiez ici si la case correspondante est remplie ou non
//              // Utilisez vraiOuFaux pour déterminer la valeur
//              if (vraiOuFaux() == "vrai"){
//                // Tracez une ligne de la gauche à la droite
//                 ctx.beginPath();
//                 ctx.moveTo(xActuel, yActuel);
//                 ctx.lineTo(300, 150);
//                 ctx.closePath();
//                 ctx.stroke();
//              } else {
//                // Tracez une ligne du haut vers le bas
//                 ctx.beginPath();
//                 ctx.moveTo(300, xActuel);
//                 ctx.lineTo(yActuel, 150);
//                 ctx.closePath();
//                 ctx.stroke();
//              }
//            }
//         }
//     }
// }

// console.log(vraiOuFaux());


// -------------TUTO YOUTUBE :Flow Fields

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// range slider

let slider = document.getElementById("myRange");
slider.value = (localStorage.getItem("previousValue")) ?  localStorage.getItem("previousValue") : 100;
let previousValue = (localStorage.getItem("previousValue")) ?  localStorage.getItem("previousValue") : slider.value;
console.log(previousValue);
console.log(slider.value);
slider.addEventListener("mouseup",  e => {
    let currentValue = slider.value;
    localStorage.setItem("previousValue", currentValue);
    location.reload();
});
console.log(localStorage);
// console.log(slider.value);

// CANVAS SETTINGS

ctx.fillStyle = 'white';
ctx.strokeStyle = "white";
ctx.lineWidth = 1;

class Particle {
    constructor (effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 5 + 1);
        this.history = [{x: this.x, y: this.y}];
        this.maxLength = Math.floor(Math.random() * 200 + 10);
        this.angle = 0;
        this.timer = this.maxLength * 2;
        this.colors = ["#9b03a1", "#c212c9", "#e51ced", "#f84dff", "#f38df7"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(context){
        // context.fillRect(this.x, this.y, 10, 10);
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y)
        for (let i=0; i < this.history.length; i++ ){
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
        
    }
    update(){
        this.timer--;
        if(this.timer >= 1){
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;
            this.angle = this.effect.flowField[index];

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY* this.speedModifier;

            this.history.push({x: this.x, y: this.y});
            if (this.history.length > this.maxLength){
                this.history.shift();
            }
        } else if ( this.history.length > 1){
            this.history.shift();
        } else {
            this.reset();
        }
        
    }
    reset(){
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{x: this.x, y: this.y}];
        this.timer = this.maxLength * 2;
    }
}

class Effect {
    constructor (canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 1000;
        this.cellSize = 20;
        this.rows;
        this.cols;
        this.flowField = [];
        this.curve = 2;
        this.zoom = previousValue/100;
        this.debug = true;
        this.init();
        console.log(this.zoom);
        window.addEventListener('keydown', e => {
            if(e.key === "d") this.debug = !this.debug;
        });
        window.addEventListener("resize", e => {
            this.resize(e.target.innerWidth, e.target.innerHeight)
        });
    }

    init(){

        //Create Flow Field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
            for (let y = 0 ; y < this.rows ; y++ ){
                for (let x = 0 ; x < this.cols ; x++){
                    let angle = (Math.cos(x * this.zoom) * Math.sin(y * this.zoom)) * this.curve;
                    this.flowField.push(angle);
                }

            }
        // create particles
        this.particles = [];
        for (let i = 0 ; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    drawGrid (context){
        context.save();
        context.strokeStyle = 'white';
        context.lineWidth = 0.3;
        for (let c = 0 ; c < this.cols ; c++){
            context.beginPath();
            context.moveTo(this.cellSize * c, 0);
            context.lineTo(this.cellSize * c, this.height);
            context.stroke();
        }
        for (let r = 0 ; r < this.rows ; r++) {
            context.beginPath();
            context.moveTo(0, this.cellSize * r);
            context.lineTo(this.width, this.cellSize * r);
            context.stroke();
        }
        context.restore();
    }
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }
    render(context){
        if (this.debug) this.drawGrid(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        })
    }
}



const effect = new Effect (canvas);



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render(ctx);
    requestAnimationFrame(animate);
}
animate();
