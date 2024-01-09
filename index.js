
// Random Line Generator

function vraiOuFaux(){
    let random = Math.floor(Math.random() * 2);
    if (random == 0){
        return "faux";
    } else{
        return "vrai"
    }
}

function dessine(x, y, pas) {
    let mainCanvas = document.getElementById("canvas");
    if (mainCanvas.getContext) {
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < 300; i += pas) {
           for (let j = 0; j < 150; j += pas) {
             const xActuel = x + i;
             const yActuel = y + j;
        
             // Vérifiez ici si la case correspondante est remplie ou non
             // Utilisez vraiOuFaux pour déterminer la valeur
             if (vraiOuFaux() == "vrai"){
               // Tracez une ligne de la gauche à la droite
                ctx.beginPath();
                ctx.moveTo(xActuel, yActuel);
                ctx.lineTo(300, 150);
                ctx.closePath();
                ctx.stroke();
             } else {
               // Tracez une ligne du haut vers le bas
                ctx.beginPath();
                ctx.moveTo(300, xActuel);
                ctx.lineTo(yActuel, 150);
                ctx.closePath();
                ctx.stroke();
             }
           }
        }
    }
}

// function dessine(){
//     let mainCanvas = document.getElementById("canvas");
//     if (mainCanvas.getContext) {
//         const ctx = canvas.getContext("2d");

        
//         if (vraiOuFaux() == "vrai"){
//             ctx.beginPath();
//             ctx.moveTo(300, 0);
//             ctx.lineTo(0, 150);
//             ctx.closePath();
//             ctx.stroke();
//         } else if(vraiOuFaux() == "faux"){
//             ctx.beginPath();
//             ctx.moveTo(0, 0);
//             ctx.lineTo(300, 150);
//             ctx.closePath();
//             ctx.stroke();
//         }
//       }
// }
// let pas;
// for (i=0, i<4, i++){
    
// }



console.log(vraiOuFaux());


