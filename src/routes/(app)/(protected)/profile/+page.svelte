<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { jwtDecode } from 'jwt-decode';
	import { onMount } from 'svelte';
	import Button from '../../../../lib/components/ui/button/button.svelte';
	import { auth } from '@/stores/auth';
	import { toast } from 'svelte-sonner';
	import Sidebar from './Sidebar.svelte';
	import { User } from '@lucide/svelte';

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
		username: string;
		email: string;
	};

	let currentUser: user | null = $state(null);
	let isLoading: boolean = true;

	onMount(async () => {
		try {
			const res = await fetch(`/api/user?email=${decodedToken?.email}`);
			currentUser = await res.json();
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

<div class="lora mt-20 flex min-h-screen justify-between gap-x-6 px-6 italic lg:px-8">
	<section class="w-64">
		<Sidebar />
	</section>

	<div class="flex flex-1 items-start justify-center">
		<div class=" flex w-1/2 flex-col items-start justify-start">
			{#if currentUser}
				<h1 class="oswald mb-10 text-4xl font-bold not-italic">Manage your profile data</h1>

				<h3>Name</h3>
				<span class="flex w-full items-center justify-start gap-x-2 rounded-lg bg-muted/50 p-2">
					<User size={16} />
					<strong>{currentUser.first_name}</strong>
				</span>
				<span>
					Last Name:
					<strong>{currentUser.last_name}</strong>
				</span>
				<span>
					Email:
					<strong>{currentUser.email}</strong>
				</span>
				<span>
					Username:
					<strong>{currentUser.username}</strong>
				</span>

				<Button onclick={handleLogOut} class="mt-12">Log out</Button>
			{/if}
		</div>
	</div>
</div>
