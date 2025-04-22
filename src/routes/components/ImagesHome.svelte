<script lang="ts">
	import { DownloadIcon } from '@lucide/svelte';
	import { onMount } from 'svelte';
	// import { SITE_URL } from '$env/static/private';

	type images = {
		_id: string;
		id: number;
		username: string,
		title: string;
		description: string;
		image_url: string;
		serial?: number;
		created_at?: string;
	};

	let allimages: images[] = [];
	let isLoading = true;

	const URL = `/api/images?limit=24`;

	onMount(async () => {
		try {
			const response = await fetch(URL);
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`);
			}
			allimages = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<p class="text-center text-sm">Loading...</p>
{:else if allimages.length === 0}
	<p class="text-center text-sm">No images images found.</p>
{:else}
	<div class="masonry mb-20">
		{#each allimages as images}
			<a
				href={`/i/${images._id}`}
				class="mb-6 block break-inside-avoid overflow-hidden rounded-lg shadow-md group relative "
				sveltekit:prefetch
			>
				<img
					src={images.image_url.concat('?auto=format&fit=crop&w=600&dpr=2')}
					alt={images.title}
					class="w-full rounded-lg object-cover group-hover:scale-105 duration-150 transition-all ease-linear"
					loading="lazy"
				/>

				<div class="bg-gradient-to-t from-black/70 to-transparent absolute z-10 bottom-0 w-full h-2/3 group-hover:opacity-100 opacity-0 duration-150 transition-all ease-linear"></div>

				<span class="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 duration-150 transition-all ease-linear">
					<h2 class="oswald mt-2 truncate text-base font-semibold  ">
						{images.title}
					</h2>
					<p class="text-xs italic text-white/60">
						@{images.username? images.username : `user${images.serial}`}
					</p>
				</span>

				<span class="absolute text-[0.65rem] italic text-white/70 bottom-2 right-2 z-20 opacity-0 transition-all duration-150 ease-linear group-hover:opacity-100 text-end lora ">
					<p class="font-semibold text-xs">Published At</p>
					{images.created_at?.slice(0,10)}
				</span>

				<!-- <button class="absolute top-3  bg-black/30 backdrop-blur-sm p-1 rounded-md right-3 group-hover:opacity-100 opacity-0 duration-150 transition-all ease-linear">
					<DownloadIcon size={20}  />
				</button> -->
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
