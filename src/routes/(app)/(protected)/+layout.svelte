<script lang="ts">
	let { children } = $props();
	import { auth } from '@/stores/auth';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	$effect(() => {
		if (browser && !$auth.token) {
				goto('login');
		}
	});
	
</script>

<div class="md:mt-48 mt-24 lg:mt-24">
	{@render children()}
</div>
