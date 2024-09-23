import rightPlayerImg from '../assets/rightPlayer.png';
import leftPlayerImg from '../assets/leftPlayer.png';

import springShoes from "../assets/powerups/springshoes.png";
import springShoesRight from "../assets/powerups/springshoesRight.png";
import brownPlatformGBreak from "../assets/blocks/groundbrown3.png";
import { blockSpawner } from './blockSpawner';

export default class Player {
    constructor() {
        this.x = 300;
        this.y = 550;
        this.img = new Image();
        this.img.src = rightPlayerImg;
        this.width = 80;
        this.height = 80;
        this.xSpeed = 6.7;
        this.ySpeed = 0;
        this.springBootsDurability = 0;
        this.direction = "left";
    }

    update(
        ctx,
        blocks,
        gravity,
        screenHeight,
        screenWidth,
        yDistanceTravelled,
        dead,
        difficulty,
        lowestBlock,
        holdingLeftKey,
        holdingRightKey
    ) {
        if (!dead.value) {
            this.ySpeed += gravity;
            // if (this.y <= screenHeight / 2 - 200 && this.ySpeed <= 0) {
            if (this.y <= screenHeight / 2 - 80 && this.ySpeed <= 0) {
                blocks.value.forEach(block => block.y -= this.ySpeed);
            } else {
                this.y += this.ySpeed;
            }
            yDistanceTravelled.value -= this.ySpeed;
        } else {
            ctx.font = "60px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("You Died!", screenWidth / 2, screenHeight / 2);
            ctx.font = "36px Arial";
            ctx.fillText("Press R to restart", screenWidth / 2, screenHeight / 2 + 50);
        }

        if (holdingLeftKey.value) {
            this.direction = "left";
            this.img.src = leftPlayerImg;
            this.moveLeft(screenWidth);
        }

        if (holdingRightKey.value) {
            this.direction = "right";
            this.img.src = rightPlayerImg;
            this.moveRight(screenWidth);
        }

        blocks.value.forEach((block, index) => {
            if (this.ySpeed >= 0) {
                if (this.x >= block.x - this.width + 15 && this.x <= block.x + block.width - 15 &&
                    this.y >= block.y - this.height && this.y <= block.y + block.height - this.height) {
                    if (block.type === "break") {
                        block.type = "broken"
                        block.fadeOut();

                        if (block.opacity <= 0) {
                            blocks.value[index] = null;
                        }

                    } else {
                        this.jump(block.powerup, block.type, block, ctx);
                        if (block.monster !== 0) {
                            block.isFalling = true;
                            block.fallSpeed = 5;
                        }
                    }
                }
            }

            if (this.y > block.y) {
                if (block.monster !== 0 && block.monster !== undefined) {
                    if (this.x >= block.x - this.width + 15 && this.x <= block.x + block.width - 15 &&
                        this.y >= block.y - block.height && this.y <= block.y + block.height) {
                        dead.value = true;
                    }
                }
            }

            if (block.isFalling) {
                block.y += block.fallSpeed; // Make the block fall down the screen
                block.fallSpeed += 0.2; // Gradually increase the falling speed to simulate gravity
            }
        });

        blocks.value = blocks.value.filter(block => block !== null);

        for (let i = blocks.value.length - 1; i > 0; i--) {
            if (blocks.value[i].y > screenHeight) {
                lowestBlock.value = i + 1;
                break;
            }
        }

        if (this.y >= blocks.value[lowestBlock.value].y) {
            dead.value = true;
        }

        if (lowestBlock.value >= 45) {
            if (difficulty.value < 8) {
                difficulty.value += 1;
            }
            blockSpawner(blocks.value, screenWidth, difficulty.value, lowestBlock.value);
        }
    }

    jump(powerup, type, block) {
        if (type === 'broken') {
            return;
        }

        this.ySpeed = -13.2;

        if (powerup === "springBoots") {
            this.springBootsDurability = 6;
            block.removePowerup();
        }

        if (type === 0 && powerup === "spring") {
            this.ySpeed = -20;
            block.activateSpring();
        }

        if (this.springBootsDurability !== 0) {
            this.ySpeed = -20;
            this.springBootsDurability -= 1;
        }
    }

    moveLeft(screenWidth) {
        this.x -= this.xSpeed;
        if (this.x <= -this.width) {
            this.x = screenWidth;
        }
    }

    moveRight(screenWidth) {
        this.x += this.xSpeed;
        if (this.x >= screenWidth) {
            this.x = -this.width;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this.springBootsDurability !== 0) {
            const offset = this.direction === "right" ? -18 : 0;

            let img = new Image();

            img.src = this.direction === "left" ? springShoes : springShoesRight;

            ctx.drawImage(img, this.x + offset + 25, this.y + 60, 45, 25);
        }
    }
}
