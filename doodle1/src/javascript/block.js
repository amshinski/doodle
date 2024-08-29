import { monsterFunctions } from "./monsters";

import spring from "../assets/powerups/spring.png";
import springShoes from "../assets/powerups/springshoes.png";

import greenPlatform from "../assets/blocks/ground.png";
import bluePlatform from "../assets/blocks/groundblue.png";
import brownPlatform from "../assets/blocks/groudbrown1.png";

export default class Block {
    constructor({
        x = 0,
        y = 0,
        width = 100,
        height = 15,
        powerup = null,
        type = null,
        monster = null,
        isFalling = false,
        fallSpeed = 0
    } = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.powerup = powerup;
        this.type = type;
        this.monster = monster;
        this.direction = "right";
        this.moveTime = 10;
        this.isFalling = false;
        this.fallSpeed = 0;
    }

    drawPlatform(ctx, platform) {
        let img = new Image();
        img.src = platform;

        ctx.drawImage(img, this.x, this.y, 100, 20);

        ctx.fillStyle = "rgba(255, 255, 255, 0)";
    }

    drawMonster(ctx) {
        monsterFunctions[this.monster].draw(ctx, this.x, this.y);

        ctx.fillStyle = "rgba(0,0,0,0)"; // test

        ctx.fillRect(this.x + 10, this.y - 5, this.width - 30, this.height);
    }

    draw(ctx) {
        if (this.monster) {
            this.drawMonster(ctx);
        } else {
            if (this.type === "break") {
                this.drawPlatform(ctx, brownPlatform);
            } else if (this.type === "sideways") {
                this.drawPlatform(ctx, bluePlatform);
            } else {
                this.drawPlatform(ctx, greenPlatform);
            }
        }

        // Draw the powerup if present
        if (this.powerup === "spring") {
            ctx.fillStyle = "grey";

            let img = new Image();
            img.src = spring;

            ctx.drawImage(img, this.x + 35, this.y - 12, 30, 20);
        } else if (this.powerup === "springBoots") {
            let img = new Image();
            img.src = springShoes;

            ctx.drawImage(img, this.x + 35, this.y - 20, 40, 30);
        }
    }

    update(screenWidth) {
        // Update block position if it moves sideways
        if (this.type === "sideways") {
            if (this.x >= screenWidth - this.width) {
                this.direction = "left";
            } else if (this.x <= 0) {
                this.direction = "right";
            }

            if (this.direction === "right") {
                this.x += 2.5;
            } else {
                this.x -= 2.5;
            }
        }

        // Update monster movement if present
        if (this.monster) {
            if (this.direction === "right") {
                this.x += 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "left";
                    this.moveTime = 10;
                }
            } else {
                this.x -= 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "right";
                    this.moveTime = 10;
                }
            }
        }
    }
}
