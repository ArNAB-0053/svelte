<script lang="ts">
	import { onMount } from 'svelte';
	// import { SITE_URL } from '$env/static/private';

	type Anime = {
		_id: string;
		id: number;
		title: string;
		description: string;
		image_url: string;
	};

	let allAnime: Anime[] = [];
	let isLoading = true;

	const URL = `/api/images`;

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
	<div class="masonry mb-20">
		{#each allAnime as anime}
			<a
				href={`/i/${anime._id}`}
				class="mb-6 block break-inside-avoid overflow-hidden rounded-lg shadow-md"
				sveltekit:prefetch
			>
				<img
					src={anime.image_url.concat('?auto=format&fit=crop&w=600&dpr=2')}
					alt={anime.title}
					class="w-full rounded-md object-cover"
					loading="lazy"
				/>

				<h2 class="oswald mt-2 truncate px-1 text-base font-semibold">
					{anime.title}
				</h2>
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
