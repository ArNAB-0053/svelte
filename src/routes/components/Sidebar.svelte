<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import { onMount } from 'svelte';
	export let data;
	let isLoading = true;
	let imageData;
	const URL = `/api/images?limit=6`;
	onMount(async () => {
		try {
			const response = await fetch(URL);
			const data = await response.json();
			imageData = data;
			console.log(imageData);
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	});
	console.log(imageData);
</script>

<div class="grid w-full grid-cols-2 gap-4">
	{#if imageData}
		{#each imageData as eachImg}
			<div class="relative">
				<img src={eachImg.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')} alt="" class="aspect-square w-full rounded-lg object-cover" />
				<div
					class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
				></div>
				<h2 class="text-md absolute bottom-2 left-2 line-clamp-1 oswald font-semibold">{eachImg.title}</h2>
			</div>
		{/each}
	{/if}
</div>
