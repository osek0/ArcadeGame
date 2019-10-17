const cvs = document.getElementById('canvas');
const ctx = cvs.getContext("2d");

const plane = new Image();
const asteroid = new Image();
const bg = new Image();

plane.src = 'img/statek50x50.png';
asteroid.src = 'img/asteroida.png'
bg.src = 'img/tlo.png';

//some variables

let move = 1;
let pX = 175;
let pY = 600;
let run = true;

// moving the plane

document.addEventListener("keydown", moveSide = e => {
    if (e.keyCode === 37 && run) {
        pX -= 5;
    }
    else if (e.keyCode === 39 && run) {
        pX += 5;
    } 
});

const rand = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// asteroid coordinates

let astero = [];

astero[0] = {
    x : rand(470, 2),
    y : -50
}

bg.onload = () => {

    const draw = () => {

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(plane, pX, pY);

        for (let i = 0; i < astero.length; i++) {
            ctx.drawImage(asteroid, astero[i].x, astero[i].y);
            
            if(run){
            astero[i].y += 2;
            }
            
            if (astero[i].y == 100 /*rand(150,100)*/) {
                astero.push({
                    x: rand(450, 2),
                    y: -50
                });
            }

            // detect collision
            
            if((pX + plane.width) > astero[i].x && pX < (astero[i].x + asteroid.width) && pY < (astero[i].y + asteroid.height) && astero[i].y < (pY + plane.height) && run){
                console.log(`boom w asteroide nr ${i}`)
                run = false;
            }

        }

        requestAnimationFrame(draw);
    }
    draw();
}
