<!-- <script>
    let URL = "http://localhost:5173/api/get-images"

    async function loadAnime() {
		try {
			await fetch(URL).then(response => response.json())
                .then(json => console.log(json))
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

    $effect(()=>{
        loadAnime()
    })
</script>

<div>
    Hii
</div> -->

<script lang="ts" module>
	import { useMobileView } from '@/hooks/use-mobile';

	export async function load({
		fetch,
	}: {
		fetch: typeof window.fetch;
	}) {
		// const page = $state(1);
		// const { mediaWidth } = useMobileView();

		// if (mediaWidth === 'lg') {
		// 	limit = 8;
		// } else {
		// 	limit = 12;
		// }
        let URL = `http://localhost:5173/api/get-images`;
		try {
			const data = await fetch(URL)
				.then((response) => response.json())
            console.log("data",data)

			return {
				props: { allAnime: data }
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
	// import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	// import { untrack } from 'svelte';

	// type AnimeType = {
	// 	allAnime: {
	// 		id: Number;
	// 		title: string;
	// 		description: string;
	// 		image_url: string;
	// 	};
	// };

	export let allAnime

    console.log("ALL")
    // console.log(allAnime)

	// const { mediaWidth } = useMobileView();

	// let { limit }: {  } = $props();

	// if (mediaWidth === 'lg') {
	// 	limit = 8;
	// } else {
	// 	limit = 12;
	// }

	// let pageNum = $state(1);
	// let isLoading = $state(false);

	let URL = `http://localhost:5173/api/get-images`;

	async function loadAnime() {
		try {
			const data = await fetch(URL)
				.then((response) => response.json());
            
            allAnime = data
            
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

    loadAnime()

	// async function handleNext() {
	// 	isLoading = true;
	// 	pageNum++;
	// 	loadAnime();
	// }

	// async function handlePrev() {
	// 	isLoading = true;
	// 	pageNum--;
	// 	loadAnime();
	// }

	// $effect(() => {
	// 	// if (pageNum <= 1) {
	// 	// 	untrack(() => loadAnime());
	// 	// }
    //     loadAnime()
	// });
</script>

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

