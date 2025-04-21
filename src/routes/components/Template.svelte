<script lang="ts">
	import { onMount } from 'svelte';

	type Anime = {
		_id: string;
		id: number;
		title: string;
		description: string;
		image_url: string;
	};

	let allAnime: Anime[] = []
	let isLoading = true;

	export let skip = 0;
	export let category = '';
	export let isCategory = false;
	export let isNew = false;
	export let isPopular = false;

	let URL = '/api/images';

	$: {
		if (isCategory && category) {
			URL = `/api/images/filter?category=${category}&limit=24&skip=${skip}`;
		} else if (isNew) {
			URL = `/api/images/new?limit=24`;
		} else if (isPopular) {
			URL = `/api/images`;
		} else {
			URL = `/api/images?limit=24&skip=${skip}`;
		}
		fetchData();
	}

	async function fetchData() {
		isLoading = true;
		try {
			const response = await fetch(URL);
			// console.log('URL:', URL);
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`);
			}
			allAnime = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
			allAnime = [];
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		fetchData();
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
				href={`/i/${anime._id}`}
				class="relative overflow-hidden rounded-lg py-2 shadow-sm"
				sveltekit:prefetch
			>
				<div class="relative h-60 overflow-hidden rounded-md">
					<picture>
						<img
							src={anime.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
							alt={anime.title}
							class="h-60 w-full object-cover"
							loading="lazy"
						/>
					</picture>					
				</div>

				<div class="mt-2 space-y-1">
					<h2 class="truncate text-base font-semibold oswald">{anime.title}</h2>
				</div>
			</a>
		{/each}
	</div>
{/if}
