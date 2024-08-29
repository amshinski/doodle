// Function to spawn a powerup based on chances
export function spawnPowerup() {
    const powerupChances = {
        "springBoots": 5,
        "spring": 15,
        "flyingHat": 80,
        "rocket": 120
    };

    const randomValue = Math.random() * Math.max(...Object.values(powerupChances));

    if (randomValue < powerupChances["springBoots"]) {
        return "springBoots";
    } else if (randomValue < powerupChances["spring"]) {
        return "spring";
    }
    // else if (randomValue < powerupChances["flyingHat"]) {
    //     return "flyingHat";
    // } else if (randomValue < powerupChances["rocket"]) {
    //     return "rocket";
    // }

    return 0;
}
