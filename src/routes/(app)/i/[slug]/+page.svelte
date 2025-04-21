<script lang="ts">
	import Sidebar from '../../../components/Sidebar.svelte';
	import { onMount } from 'svelte';
	export let data;
	let isLoading = true;
	let imageData;
	const URL = `/api/image?id=${data.slug}`;
	console.log(data.slug);

	onMount(async () => {
		try {
			const response = await fetch(URL);
			const data = await response.json();
			imageData = data;
			console.log("RRR", imageData);
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	});
	console.log(imageData);
</script>

<div class=" mt-20 flex min-h-screen items-start justify-between gap-x-16 px-6 pb-20 pt-10 lg:px-8">
	<div class="flex-1 max-md:hidden">
		<h2 class="oswald mb-4 rounded-md bg-muted px-4 py-1 text-2xl font-bold">You may also like</h2>
		<Sidebar />
	</div>

	{#if imageData}
		<div
			class="flex w-[95%] flex-col items-start justify-center gap-x-3 rounded-lg bg-secondary p-5 md:w-[60%]"
		>
			<div class="flex w-full items-center justify-center bg-secondary">
				<span
					class="flex h-[95vh] w-auto items-center justify-center overflow-hidden rounded-lg shadow-lg"
				>
					<img
						src={imageData.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
						alt={imageData.title || 'Image'}
						class="h-full w-auto"
					/>
				</span>
			</div>

			<div class="mt-6 h-[1px] w-full bg-zinc-600/50"></div>

			<span class="mt-6 w-full">
				<h1 class="oswald text-bold text-3xl">{imageData.title}</h1>
				<p class="lora text-bold mt-2 text-sm italic text-white/70">{imageData.description}</p>
				<span class="mt-5 flex items-center justify-start gap-x-1 text-xs">
					{#each imageData.categories as category}
						<p class="rounded-sm bg-black px-1.5 py-1 text-xs text-muted-foreground">{category}</p>
					{/each}
				</span>
			</span>
		</div>
	{/if}

	<!-- {allAnime.id}
    {allAnime.title}
    {allAnime.description} -->
</div>
