<script>
	import Template from '../../components/Template.svelte';

    export let data;
</script>

<div class="mt-24 md:mt-48 lg:mt-24 px-6 lg:px-8">
    <h2 class="lora mb-5 text-3xl font-semibold italic text-gray-300">
		Finding <strong class="font-black text-white">new</strong>
		images for you .
	</h2>

    <Template  category={'all'} isNew={true}/>
</div>