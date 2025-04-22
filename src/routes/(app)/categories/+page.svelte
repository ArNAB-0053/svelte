<script lang="ts">
	import Categories from '../../components/Categories.svelte';
	import Template from '../../components/Template.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let data = $props()
	// let URL: string= `/api/images?limit=24,`
	// console.log(category);
	// console.log($page)
	let category: string | undefined | null = $state();

	async function fetchCategory() {
		let path = page.url.searchParams.get('category');
		category = path ? path : 'all';
		// console.log(category)
	}

	$effect(()=> {
		
		// console.log(page.url.searchParams.get("category"))
		// console.log(path)
		fetchCategory()
		// console.log(category);
	})


	// async function handleCategories(cat: string) {
	// 	// console.log(cat);
	// 	category = cat;
	// }
</script>

<div class="mt-24 md:mt-40 lg:mt-24 px-6 lg:px-8">
	<Categories/>
	{#if category}
		<h2 class="oswald mb-5 mt-16 text-3xl">Best <i class="lora italic">images</i> for you</h2>
		<Template {category} isCategory={true} />
	{/if}
</div>
