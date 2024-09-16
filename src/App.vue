<template>
	<GameCanvas v-if="canvasVisible" />
</template>

<script setup>
import GameCanvas from "./components/GameCanvas.vue";
import { onMounted, ref } from "vue";

const canvasVisible = ref(false);

function preloadImages(imagePaths) {
	let loadedImages = [];
	let totalImages = imagePaths.length;
	let loadedCount = 0;

	return new Promise((resolve, reject) => {
		imagePaths.forEach((path) => {
			const img = new Image();
			img.src = path;

			img.onload = () => {
				loadedCount++;
				if (loadedCount === totalImages) {
					resolve(loadedImages);
				}
			};

			img.onerror = () => {
				reject(`Failed to load image: ${path}`);
			};

			loadedImages.push(img);
		});
	});
}

const imagePaths = [
	'src/assets/powerups/spring.png',
	'src/assets/powerups/spring2.png',
	'src/assets/powerups/springshoes.png',
	'src/assets/powerups/springshoesRight.png',

	'src/assets/blocks/ground.png',
	'src/assets/blocks/groundblue.png',
	'src/assets/blocks/groundbrown1.png',
	'src/assets/blocks/groundbrown2.png',
	'src/assets/blocks/groundbrown3.png',

	'src/assets/background.png',
	'src/assets/leftPlayer.png',
	'src/assets/rightPlayer.png',
];

onMounted(() => {
	preloadImages(imagePaths)
		.then((images) => {
			canvasVisible.value = true;
		})
		.catch((error) => {
			console.error(error);
		});
})
</script>

<style scoped>

</style>
