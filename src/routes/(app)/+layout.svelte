<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { user } from '$lib/stores/user';
	import { browser } from '$app/environment';
	import { jwtDecode } from 'jwt-decode';

	onMount(async () => {
		if (browser && $auth.token) {
			try {
				const decodedToken: { email?: string } = jwtDecode($auth.token);
				if (decodedToken.email) {
					const res = await fetch(`/api/user?email=${decodedToken.email}`);
					if (res.ok) {
						const userData = await res.json();
						console.log(userData)
						user.set(userData);
					} else {
						user.set(null);
					}
				}
			} catch (error) {
				console.error('Failed to fetch user data:', error);
				user.set(null);
			}
		}
	});
</script>

<slot />
