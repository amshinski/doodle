let c = document.createElement("canvas");
let ctx = c.getContext("2d");

let screenWidth = 500;
let screenHeight = 800;
c.width = screenWidth;
c.height = screenHeight;
document.body.appendChild(c);

window.addEventListener('keydown' ,this.keydown, false);
window.addEventListener('keyup', this.keyup, false);

//Variables
const gravity = 0.34;
let holdingLeftKey = false;
let holdingRightKey = false;
let keycode;
let dead = false;
let difficulty = 0;
let lowestBlock = 0;
let score = 0;
let yDistanceTravelled = 0;

let blocks = [];
let powerups = [];

//Time variables
let fps = 60;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;

function keydown(e) {
    if (e.keyCode === 65) {
        holdingLeftKey = true;
    }   else if (e.keyCode === 68) {
        holdingRightKey = true;
    }

    if (e.keyCode === 82 && dead) {
        blocks = [];
        lowestBlock = 0;
        difficulty = 0;
        score = 0;
        yDistanceTravelled = 0;
        player.springBootsDurability = 0;

        blocks.push(new block);
        blocks[0].x = 300;
        blocks[0].y = 650;
        blocks[0].monster = 0;
        blocks[0].type = 0;
        blocks[0].powerup = 0;

        blockSpawner();
        
        player.x = 300;
        player.y = 550;

        dead = false;
    }
}

function keyup(e) {
    if (e.keyCode === 65) {
        holdingLeftKey = false;
    } else if (e.keyCode === 68) {
        holdingRightKey = false;
    }
}

function showScore() {
    if (yDistanceTravelled > score) {
        score = Math.round(yDistanceTravelled);
    }

    ctx.font = "36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(score, 15, 40); 
}

blocks.push(new block);
blocks[0].x = 300;
blocks[0].y = 650;
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;

blockSpawner();

function loop() {
    requestAnimationFrame(loop);

    //This sets the FPS to 60
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
        let backgroundImage = new Image();
        backgroundImage.src = "assets/background.png";
        ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight) 

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i] !== 0) {
                blocks[i].update();
                blocks[i].draw();
            }
        }

        player.update();
        player.draw();

        showScore();

        ctx.fill();
        then = now - (delta % interval);
    }
}

loop();
