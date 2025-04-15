<script lang="ts">
	import '../app.css';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	let { children } = $props();
</script>

<div>
	<Header />
	{@render children()}
	<Footer/>
</div>
