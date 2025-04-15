<script>
	import { onMount } from "svelte";
	import Home from "./Home.svelte";
	import Banner from "./Banner.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import AllAnime from "./AllAnime.svelte";
	import ImagesHome from "./ImagesHome.svelte";

	let animeList = [];
	let topAnimeList = [];
	let isLoading = true;

	const animeURL = {
		top: "http://localhost:5173/api/get-images?limit=5",
		all: "http://localhost:5173/api/get-images",
	};

	onMount(async () => {
		try {
			const [topRes, allRes] = await Promise.all([
				fetch(animeURL.top).then((response) => response.json()),
				fetch(animeURL.all).then((response) => response.json())
			]);

			topAnimeList = topRes;
			animeList = allRes;
		} catch (error) {
			console.error('Failed to fetch anime:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<!-- <Header/> -->
<Banner animeList={topAnimeList} {isLoading} />

<main class="lg:px-8 mt-8">
    <!-- <AllAnime /> -->

	<ImagesHome />
</main>

<Footer/>
