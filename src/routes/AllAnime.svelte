<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";
	import { onMount } from "svelte";

    let page = 1;
    const animeURL = `https://api.jikan.moe/v4/anime?page=${page}`

    let animeList = [];
	let isLoading = true;

    onMount(async () => {
		try {
			const allRes = await fetch(animeURL);
			const allData = await allRes.json();
			animeList = allData.data;
		} catch (error) {
			console.error('Failed to fetch anime:', error);
		} finally {
			isLoading = false;
		}
	});

	export const handleNext = () => {
		page += 1
	}
</script>

<Button>Prev</Button>
<Button on:click(handleNext)>Next</Button>

<div class="container mx-auto py-8">
	<h1 class="mb-6 text-3xl font-bold text-primary">Trending Anime</h1>

	{#if isLoading}
		<p class="text-muted-foreground">Loading anime list...</p>
	{:else}
		<div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
			{#each animeList as anime}
				<div class="relative overflow-hidden rounded-lg p-2 shadow-sm">
					<div class="relative h-60 overflow-hidden rounded-md">
						<img
							src={anime.images.webp.large_image_url}
							alt={anime.title}
							class="h-full w-full object-cover"
						/>
						<!-- {#if anime.score}
							<div class="absolute bottom-1 left-0">
								<ScoreRing score={anime.score} />
							</div>
						{/if} -->
					</div>

					<div class="mt-2 space-y-1">
						<h2 class="truncate text-base font-semibold">{anime.title}</h2>
						<!-- <p class="truncate text-sm text-muted-foreground">
							Episodes: {anime.episodes ?? 'Unknown'}
						</p> -->
					</div>
				</div>
			{/each}
		</div>

		<!-- <Pagination rows={examples} perPage={3} bind:trimmedRows={values} /> -->
	{/if}
</div>