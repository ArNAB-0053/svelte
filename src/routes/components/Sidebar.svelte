<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import { onMount } from 'svelte';
	export let data;
	let isLoading = true;
	let imageData;
	const URL = `/api/categories?limit=12`;
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

<div class="grid w-full grid-cols-3 gap-4">
	{#if imageData}
		{#each imageData as eachImg}
			<a href="/categories?category={eachImg.title}" class="relative">
				<img
					src={eachImg.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
					alt=""
					class="aspect-square w-full rounded-lg object-cover"
				/>
				<div class="flex items-center justify-center absolute inset-0 bg-black/30">
					<h2 class="text-md oswald line-clamp-1 font-semibold">{eachImg.title}</h2>
				</div>
			</a>
		{/each}
	{/if}
</div>
