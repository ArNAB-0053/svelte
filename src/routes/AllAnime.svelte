<script lang="ts" module>
	import { useMobileView } from '@/hooks/use-mobile';

	export async function load({
		fetch,
		limit = 18
	}: {
		fetch: typeof window.fetch;
		limit?: number;
	}) {
		const page = $state(1);
		const { mediaWidth } = useMobileView();

		// if (mediaWidth === 'lg') {
		// 	limit = 8;
		// } else {
		// 	limit = 12;
		// }

		try {
			const res = await fetch(
				`http://localhost:5173/api/get-images`
			);
			const data = await res.json();

			if (res.ok) {
				return {
					props: { allAnime: data }
				};
			}
			return {
				status: res.status,
				error: new Error('Failed to fetch anime data')
			};
		} catch (error) {
			return {
				status: 500,
				error: new Error('Failed to fetch anime data')
			};
		}
	}
</script>

<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { untrack } from 'svelte';

	type AnimeType = {
		allAnime: {
			id: Number;
			title: string;
			description: string;
			image_url: string;
		};
	};

	let {
		allAnime,
		limit = 18
	}: {
		allAnime: AnimeType;
		limit?: number;
	} = $props<{}>();

	const { mediaWidth } = useMobileView();

	// let { limit }: {  } = $props();

	// if (mediaWidth === 'lg') {
	// 	limit = 8;
	// } else {
	// 	limit = 12;
	// }

	let pageNum = $state(1);
	let isLoading = $state(false);

	let URL = `http://localhost:5173/api/get-images`;

	async function loadAnime() {
		try {
			const res = await fetch(URL);
			const data = await res.json();
			if (res.ok) {
				allAnime = data;
			}
		} catch (error) {
			console.error('Fetch error:', error);
		} finally {
			isLoading = false;
		}
	}

	async function handleNext() {
		isLoading = true;
		pageNum++;
		loadAnime();
	}

	async function handlePrev() {
		isLoading = true;
		pageNum--;
		loadAnime();
	}

	$effect(() => {
		if (pageNum <= 1) {
			untrack(()=>loadAnime());
		} 
	});
</script>

<p>{pageNum}</p>

<div class="flex items-center justify-between">
	<h1 class="mb-6 text-3xl font-bold text-primary">Popular Anime</h1>
	<span class="flex items-center justify-end gap-x-3">
		<button
			onclick={handlePrev}
			disabled={isLoading || pageNum == 1}
			class="flex items-center justify-center gap-x-1 rounded-md bg-secondary/80 p-1 text-sm text-primary/80 duration-200 ease-in-out hover:bg-secondary hover:text-primary/95 disabled:bg-secondary/50 disabled:text-primary/50"
		>
			<ChevronLeft size={26} />
			<!-- <p class="-mt-0.5">Prev</p> -->
		</button>

		<button
			onclick={handleNext}
			disabled={isLoading}
			class="flex items-center justify-center gap-x-1 rounded-md bg-secondary/80 p-1 text-sm text-primary/80 duration-200 ease-in-out hover:bg-secondary hover:text-primary/95 disabled:bg-secondary"
		>
			<!-- <p class="-mt-0.5">Next</p> -->
			<ChevronRight size={26} />
		</button>
	</span>
</div>

{#if isLoading}
	<p class="text-muted-foreground">Loading anime list...</p>
{:else}
	<div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
		{#each allAnime as anime}
			<a
				data-sveltekit-preload-data="tap"
				href={`/i/${anime.id}`}
				class="relative overflow-hidden rounded-lg p-2 shadow-sm"
			>
				<div class="relative h-60 overflow-hidden rounded-md">
					<img
						src={anime.image_url}
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
			</a>
		{/each}
	</div>

	<!-- <Pagination rows={examples} perPage={3} bind:trimmedRows={values} /> -->
{/if}
