
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


// CANVAS SETTINGS

ctx.fillStyle = 'white';
ctx.strokeStyle = "white";
ctx.lineWidth = 1;

class Particle {
    constructor (effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
    }
    draw(context){
        context.fillRect(this.x, this.y, 10, 10);
    }
}

class Effect {
    constructor (width, height){
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles = 50;
        this.init();
    }

    init(){
        // create particles
        for (let i = 0 ; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    render(context){
        this.particles.forEach(particle => {
            particle.draw(context);
        })
    }
}

const effect = new Effect (canvas.width , canvas.height);
effect.init();
effect.render(ctx);
console.log(effect);