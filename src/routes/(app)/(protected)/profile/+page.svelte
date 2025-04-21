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
	import { user } from '@/stores/user';

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

<div class="mt-24 flex min-h-screen items-start justify-between bg-black px-6 gap-x-10 text-white lg:px-8">
	<section class="w-64  ">
		<Sidebar />
	</section>

	<div class="h-[80vh] w-[1px] bg-border"></div>

	<div class="flex-1 flex items-center justify-center">
		<div
			class="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-md"
		>
			<!-- Profile Header -->
			<div class="mb-10 flex items-center gap-6">
				<!-- Avatar -->
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-3xl font-bold text-white shadow-inner"
				>
					{$user?.first_name?.[0] ?? '?'}
				</div>

				<div>
					<h2 class="text-3xl font-bold">
						{$user?.first_name}
						{currentUser?.last_name}
					</h2>
					<p class="text-sm text-zinc-400">{currentUser?.email}</p>
				</div>
			</div>

			<!-- Profile Info Section -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div>
					<p class="text-sm text-zinc-400">First Name</p>
					<p class="text-lg font-medium">{currentUser?.first_name}</p>
				</div>

				<div>
					<p class="text-sm text-zinc-400">Last Name</p>
					<p class="text-lg font-medium">{currentUser?.last_name}</p>
				</div>

				<div>
					<p class="text-sm text-zinc-400">Email</p>
					<p class="text-lg font-medium">{currentUser?.email}</p>
				</div>

				<div>
					<p class="text-sm text-zinc-400">Username</p>
					<p class="text-lg font-medium">{currentUser?.username}</p>
				</div>
			</div>

			<!-- Logout Button -->
			<div class="mt-10 text-right">
				<Button
					on:click={handleLogOut}
					class="rounded-xl bg-red-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:bg-red-700"
				>
					Log Out
				</Button>
			</div>
		</div>
	</div>
</div>
