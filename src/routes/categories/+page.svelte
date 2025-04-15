<script>
	import Categories from '@/components/Categories.svelte';
	import Template from '@/components/Template.svelte';

    export let data;
</script>

<div class="mt-20 px-6 lg:px-8">
	<Categories />

	<h2 class="oswald mt-16 mb-5 text-3xl">Best <i class="lora italic">images</i> for you</h2>
    <Template />
</div>