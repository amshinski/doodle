import Block from './block';

import { spawnBlock } from './blockType';
import { spawnPowerup } from './powerups';
import { spawnMonster } from './monsters';

export function blockSpawner(blocks, screenWidth, difficulty, lowestBlock) {
    let index = 1;

    if (lowestBlock !== 0) {
        index = lowestBlock;
    }

    for (index; index < lowestBlock + 60; index++) {
        if (index >= blocks.length) {
            blocks.push(new Block());

            blocks[index - 1].difficulty = difficulty;

            if (blocks[index - 1].type === "break") {
                blocks[index].type = 0;
            } else {
                blocks[index].type = spawnBlock(difficulty);
            }

            blocks[index].powerup = 0;
            blocks[index].monster = 0;

            if (blocks[index].type === 0) {
                blocks[index].powerup = spawnPowerup();

                if (blocks[index].powerup === 0 && difficulty > 0) {
                    blocks[index].monster = spawnMonster();
                }
            }

            blocks[index].x = Math.random() * (screenWidth - blocks[index].width);

            let diffMultiplier = difficulty >= 6 ? 6 : difficulty;

            if (blocks[index].type === "break" || blocks[index - 1].type === "break") {
                blocks[index].y = (blocks[index - 1].y) - (((Math.random() * (80 + (diffMultiplier * 18))) + 30) / 2);
            } else if (blocks[index].monster !== 0 || blocks[index - 1].monster !== 0) {
                blocks[index].y = (blocks[index - 1].y) - ((Math.random() * (80 + (diffMultiplier * 18))) + 50);
            } else {
                blocks[index].y = (blocks[index - 1].y) - ((Math.random() * (80 + (diffMultiplier * 18))) + 30);
            }
        }
    }

    // Remove blocks that are below us now
    for (let i = 0; i < lowestBlock - 2; i++) {
        blocks.shift();
    }
}
