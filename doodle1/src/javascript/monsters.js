import smallRed from '../assets/monsters/smallRed.png';
import smallPurple from '../assets/monsters/smallPurple.png';
import bigGreen from '../assets/monsters/bigGreen.png';

export function spawnMonster() {
    const monsterChances = {
        "smallRed": 30,
        "smallPurple": 60,
        "bigGreen": 90,
    };

    if (Math.round(Math.random() * monsterChances["smallRed"]) === 0) {
        return "smallRed";
    } else if (Math.round(Math.random() * monsterChances["smallPurple"]) === 0) {
        return "smallPurple";
    } else if (Math.round(Math.random() * monsterChances["bigGreen"]) === 0) {
        return "bigGreen";
    }

    return 0;
}

// Monster configuration
class SmallRedMonster {
    constructor() {
        this.img = new Image();
        this.img.src = smallRed;
        this.xDif = 10;
        this.yDif = -30;
        this.width = 69;
        this.height = 60;
    }

    draw(ctx, blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

class SmallPurpleMonster {
    constructor() {
        this.img = new Image();
        this.img.src = smallPurple;
        this.xDif = 10;
        this.yDif = -30;
        this.width = 69;
        this.height = 60;
    }

    draw(ctx, blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

class BigGreenMonster {
    constructor() {
        this.img = new Image();
        this.img.src = bigGreen;
        this.xDif = 10;
        this.yDif = -30;
        this.width = 69;
        this.height = 60;
    }

    draw(ctx, blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

// Export monster configurations
export const monsterFunctions = {
    "smallRed": new SmallRedMonster(),
    "smallPurple": new SmallPurpleMonster(),
    "bigGreen": new BigGreenMonster(),
};
