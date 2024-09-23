<template>
	<canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import Player from "../javascript/player.js";
import { blockSpawner } from "../javascript/blockSpawner";
import Block from "../javascript/block.js";

import backgroundImg from '../assets/background.png';

const player = new Player();

const screenWidth = 500;
const screenHeight = 800;

const gravity = 0.34;
const holdingLeftKey = ref(false);
const holdingRightKey = ref(false);
const dead = ref(false);
const difficulty = ref(0);
const lowestBlock = ref(0);
const score = ref(0);
const yDistanceTravelled = ref(0);
const blocks = ref([]);
const powerups = ref([]);
const fps = 60;
const interval = 1000 / fps;

let now;
let then = Date.now();
let delta;

const canvasRef = ref(null);

const keydown = (e) => {
	if (e.keyCode === 65 || e.keyCode === 37) {
		holdingLeftKey.value = true;
	} else if (e.keyCode === 68 || e.keyCode === 39) {
		holdingRightKey.value = true;
	}

	if (e.keyCode === 82 && dead.value) {
		restartGame();
	}
};

const keyup = (e) => {
	if (e.keyCode === 65 || e.keyCode === 37) {
		holdingLeftKey.value = false;
	} else if (e.keyCode === 68 || e.keyCode === 39) {
		holdingRightKey.value = false;
	}
};

const restartGame = () => {
	blocks.value = [];
	lowestBlock.value = 0;
	difficulty.value = 0;
	score.value = 0;
	yDistanceTravelled.value = 0;
	player.springBootsDurability = 0;

	blocks.value.push(new Block());
	blocks.value.push(new Block());

	Object.assign(blocks.value[0], { x: 0, y: screenHeight, monster: 0, type: 0, powerup: 0, width: screenWidth });
	Object.assign(blocks.value[1], { x: 300, y: 650, monster: 0, type: 0, powerup: 0, difficulty: difficulty.value });

	blockSpawner(blocks.value, screenWidth, difficulty.value, lowestBlock.value);

	Object.assign(player, { x: 300, y: 550 });

	dead.value = false;
};

const showScore = (ctx) => {
	let currentDistanceTravelled = Math.round(yDistanceTravelled.value / 30);

	if (currentDistanceTravelled > score.value) {
		score.value = Math.round(currentDistanceTravelled);
	}

	ctx.font = '36px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'left';
	ctx.fillText(score.value, 15, 40);
};

const loop = (ctx) => {
	requestAnimationFrame(() => loop(ctx));

	now = Date.now();
	delta = now - then;

	if (delta > interval) {
		const backgroundImage = new Image();
		backgroundImage.src = backgroundImg;
		ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight);

		for (let i = 0; i < blocks.value.length; i++) {
			if (blocks.value[i] !== 0) {
				blocks.value[i].update(screenWidth);
				blocks.value[i].draw(ctx);
			}
		}

		player.update(
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
		);

		player.draw(ctx);

		showScore(ctx);

		ctx.fill();
		then = now - (delta % interval);
	}
};

onMounted(() => {
	const canvas = canvasRef.value;
	const ctx = canvas.getContext('2d');

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	window.addEventListener('keydown', keydown, false);
	window.addEventListener('keyup', keyup, false);

	blocks.value.push(new Block());
	blocks.value.push(new Block());

	Object.assign(blocks.value[0], { x: 0, y: screenHeight, monster: 0, type: 0, powerup: 0, width: screenWidth });
	Object.assign(blocks.value[1], { x: 300, y: 650, monster: 0, type: 0, powerup: 0, difficulty: difficulty.value });

	blockSpawner(blocks.value, screenWidth, difficulty.value, lowestBlock.value);

	loop(ctx);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', keydown, false);
	window.removeEventListener('keyup', keyup, false);
});

</script>

<style scoped>

</style>
