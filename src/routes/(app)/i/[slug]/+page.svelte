<script lang="ts">
	import Sidebar from '../../../components/Sidebar.svelte';
import { onMount } from 'svelte';
	export let data;
	let isLoading = true;
	let imageData;
	const URL = `/api/image?id=${data.slug}`;
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



<div class=" px-6 lg:px-8 flex items-start justify-between gap-x-16 min-h-screen mt-20 pt-10 pb-20">
	<div class="flex-1 max-md:hidden">
		<h2 class="oswald text-2xl font-bold mb-4 bg-muted px-4 py-1 rounded-md">You may also like</h2>
		<Sidebar />
	</div>

	{#if imageData}
		<div class="w-[95%] md:w-[60%] flex flex-col items-start justify-center gap-x-3 bg-secondary rounded-lg p-5">
			<div class="w-full flex items-center justify-center bg-secondary">
				<span class="w-auto flex items-center justify-center h-[95vh] shadow-lg  rounded-lg  overflow-hidden">
					<img src={imageData.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')} alt={imageData.title || 'Image'} class="h-full w-auto" />
				</span>
			</div>

			<div class="h-[1px] w-full bg-zinc-600/50 mt-6"></div>
			
			<span class="w-full mt-6">
				<h1 class="oswald text-3xl text-bold">{imageData.title}</h1>
				<p class="lora italic text-sm text-white/70 text-bold mt-2">{imageData.description}</p>
				<span class="text-xs flex items-center justify-start gap-x-1 mt-5">
					{#each imageData.tags as tag}
						<p class="text-xs bg-black py-1 px-1.5 rounded-sm text-muted-foreground">{tag}</p>
					{/each}
				</span>
			</span>
		</div>
	{/if}

	<!-- {allAnime.id}
    {allAnime.title}
    {allAnime.description} -->
</div>
