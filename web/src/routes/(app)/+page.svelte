<script>
	import { onMount } from "svelte";
	import Banner from "../components/Banner.svelte";
	import ImagesHome from "../components/ImagesHome.svelte";

	let imagesList = [];
	let topimagesList = [];
	let isLoading = true;

	const animeURL = {
		top: "/api/categories?limit=5",
		all: "/api/images",
	};

	onMount(async () => {
		try {
			const [topRes, allRes] = await Promise.all([
				fetch(animeURL.top).then((response) => response.json()),
				fetch(animeURL.all).then((response) => response.json())
			]);

			topimagesList = topRes;
			imagesList = allRes;
		} catch (error) {
			console.error('Failed to fetch anime:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<!-- <Header/> -->
<Banner imagesList={topimagesList} {isLoading} />

<main class="px-6 lg:px-8 mt-8">
    <!-- <AllAnime /> -->

	<ImagesHome />
</main>
