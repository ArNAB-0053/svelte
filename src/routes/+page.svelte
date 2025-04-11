<script>
	import { onMount } from "svelte";
	import Home from "./Home.svelte";
	import Banner from "./Banner.svelte";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";

	let animeList = [];
	let topAnimeList = [];
	let isLoading = true;

	const animeURL = {
		top: "https://api.jikan.moe/v4/top/anime",
		all: "https://api.jikan.moe/v4/anime",
	};

	onMount(async () => {
		try {
			const [topRes, allRes] = await Promise.all([
				fetch(animeURL.top),
				fetch(animeURL.all)
			]);

			const topData = await topRes.json();
			const allData = await allRes.json();

			topAnimeList = topData.data;
			animeList = allData.data;
		} catch (error) {
			console.error('Failed to fetch anime:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<Header/>
<Banner animeList={topAnimeList} {isLoading} />

<main class="lg:px-8">
    <Home {animeList} {isLoading} perPage={10}/>
</main>

<Footer/>
