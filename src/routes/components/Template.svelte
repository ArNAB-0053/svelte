<script lang="ts">
	import { onMount } from 'svelte';

	type Anime = {
		id: number;
		title: string;
		description: string;
		image_url: string;
	};

	let allAnime: Anime[] = $state([]);
	let isLoading = $state(true);

	let {skip = 0} = $props();

	const URL = `/api/images?limit=24&skip=${skip}`;

	onMount(async () => {
		try {
			const response = await fetch(URL);
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`);
			}
			allAnime = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
<p class="text-center text-sm">Loading...</p>
{:else if allAnime.length === 0}
	<p class="text-center text-sm">No anime images found.</p>
{:else}
	<div class="grid pb-10 grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
		{#each allAnime as anime}
			<a
				href={`/i/${anime.id}`}
				class="relative overflow-hidden rounded-lg py-2 shadow-sm"
				sveltekit:prefetch
			>
				<div class="relative h-60 overflow-hidden rounded-md">
					<picture>
						<!-- <source srcset={anime.image_url.replace('.jpg', '.webp')} type="image/webp" /> -->
						<img
							src={anime.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
							alt={anime.title}
							class="h-60 w-full object-cover"
							loading="lazy"
						/>
					</picture>					
				</div>

				<div class="mt-2 space-y-1">
					<h2 class="truncate text-base font-semibold oswald">{anime.title} || {anime.id}</h2>
				</div>
			</a>
		{/each}
	</div>
{/if}