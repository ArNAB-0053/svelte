<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { jwtDecode } from 'jwt-decode';
	import { onMount } from 'svelte';
	import Button from '../../../../lib/components/ui/button/button.svelte';
	import { auth } from '@/stores/auth';
	import { toast } from 'svelte-sonner';

	let decodedToken: string | null = $state(null);

	$effect(() => {
		if (browser) {
			if ($auth.token) {
				decodedToken = jwtDecode($auth.token);
			}
		} else {
			console.log('Not working');
		}
	});

	type user = {
		first_name: string;
		last_name: string;
		email: string;
	};

	let user: user | null = $state(null);
	let isLoading: boolean = true;

	onMount(async () => {
		try {
			const res = await fetch(`/api/user?email=${decodedToken?.email}`);
			user = await res.json();
			// console.log(user);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	});

	function handleLogOut() {
		auth.set({ token: null, isLoggedIn: false });
		toast.success('Logged in successfully!');
		setTimeout(() => {
			goto('/');
		}, 2000);
	}
</script>

<div class="lora mt-20 flex min-h-screen flex-col items-start justify-start px-6 italic lg:px-8">
	{#if user}
		<span>
			First Name:
			<strong>{user.first_name}</strong>
		</span>
		<span>
			Last Name:
			<strong>{user.last_name}</strong>
		</span>
		<span>
			Email:
			<strong>{user.email}</strong>
		</span>

		<Button onclick={handleLogOut} class="mt-12">Log out</Button>
	{/if}
</div>
