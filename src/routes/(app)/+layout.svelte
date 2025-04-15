<script lang="ts">
	import '../../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	let { children } = $props();
</script>

<div>
	<Header />
	{@render children()}
	<Footer/>
</div>
