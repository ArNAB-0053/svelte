<script lang="ts">
	import { page } from "$app/state";
	import Template from "../../components/Template.svelte";

	let searched: string | undefined | null = $state();

	async function fetchCategory() {
		let path = page.url.searchParams.get('q');
        console.log(path)
		searched = path ? path : 'all';
        // console.log(path)
	}

	$effect(() => {
		fetchCategory();
	});
</script>

<div class="mt-20 min-h-screen px-6 lg:px-8">
    <Template {searched} isSearch={true} />
</div>
