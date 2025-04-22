<script lang="ts">
	import { onMount } from 'svelte';

	type images = {
		_id: string;
		id: number;
		title: string;
		description: string;
		image_url: string;
		username: string;
		serial?: number;
		created_at?: string;
	};

	let allimages: images[] = [];
	let isLoading = true;

	export let skip = 0;
	export let category = '';
	export let searched = '';
	export let isCategory = false;
	export let isNew = false;
	export let isPopular = false;
	export let isSearch = false;

	let URL = '/api/images';

	$: {
		if (isCategory && category) {
			URL = `/api/images/filter?category=${category}&limit=24&skip=${skip}`;
		} else if (isNew) {
			URL = `/api/images/new?limit=24`;
		} else if (isPopular) {
			URL = `/api/images`;
		} else if (isSearch) {
			URL = `/api/images/search?q=${searched}`;
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
			allimages = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
			allimages = [];
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
{:else if allimages.length === 0}
	<p class="text-center text-sm">No images images found.</p>
{:else}
	<div class="masonry mb-8 min-h-screen">
		{#each allimages as images}
			<a
				href={`/i/${images._id}`}
				class="group relative mb-6 block break-inside-avoid overflow-hidden rounded-lg shadow-md"
				sveltekit:prefetch
			>
				<div class="relative overflow-hidden rounded-md">
					<picture>
						<img
							src={images.image_url.concat('?auto=format&fit=crop&w=600&dpr=2')}
							alt={images.title}
							class="w-full rounded-lg object-cover transition-all duration-150 ease-linear group-hover:scale-105"
							loading="lazy"
						/>
					</picture>
				</div>

				<div
					class="absolute bottom-0 z-10 h-2/3 w-full bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-all duration-150 ease-linear group-hover:opacity-100"
				></div>

				<span
					class="absolute bottom-2 left-2 z-20 opacity-0 transition-all duration-150 ease-linear group-hover:opacity-100"
				>
					<h2 class="oswald mt-2 truncate text-base font-semibold">
						{images.title}
					</h2>
					<p class="text-xs italic text-white/60">
						@{images.username ? images.username : `user${images.serial}`}
					</p>

				</span>
				<span class="absolute text-[0.65rem] italic text-white/70 bottom-2 right-2 z-20 opacity-0 transition-all duration-150 ease-linear group-hover:opacity-100 text-end lora">
					<p class="font-semibold text-xs">Published At</p>
					{images.created_at?.slice(0,10)}
				</span>
			</a>
		{/each}
	</div>
{/if}

<style>
	.masonry {
		column-count: 2;
		column-gap: 1rem;
	}

	@media (min-width: 768px) {
		.masonry {
			column-count: 3;
		}
	}

	@media (min-width: 1024px) {
		.masonry {
			column-count: 4;
		}
	}
</style>
