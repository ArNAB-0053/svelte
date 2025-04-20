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

<div>
	{@render children()}
</div>
