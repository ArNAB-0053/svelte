<script lang="ts">
	import { Toaster } from '@/components/ui/sonner';
	import '../app.css';
	import Footer from './components/Footer.svelte';
	import Header from './components/Header.svelte';
	let { children } = $props();
</script>

<div>
	<Toaster />
	<Header />
	{@render children()}
	<Footer />
</div>
