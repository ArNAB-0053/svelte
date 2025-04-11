<script lang="ts">
	import * as Pagination from "$lib/components/ui/pagination/index.js";

	let { animeList, isLoading, perPage = 12 }:{
        animeList: any[], 
		isLoading: boolean,
		perPage?: number
    } = $props();

	const currentPage = $state(1);
	const totalPages = $derived(() => Math.ceil(animeList.length / perPage));

	// Get paginated anime based on current page
	const paginatedAnime = $derived(() => {
	const start = (currentPage() - 1) * perPage;
	const end = currentPage() * perPage;
	return animeList.slice(start, end);
});
</script>

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
	{/if}
</div>
