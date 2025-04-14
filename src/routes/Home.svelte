<script lang="ts">
	import * as Pagination from "$lib/components/ui/pagination/index.js";
	import AllAnime from "./AllAnime.svelte";
	// import Pagination from "./Pagination.svelte";

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
	

	<AllAnime />

	
</div>
