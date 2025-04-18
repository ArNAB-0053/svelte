<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { auth } from '@/stores/auth';
	let username = '';
	let email = '';
	let password = '';
	let message = '';

	let red = false;

	if (browser) {
		const token = localStorage.getItem('token');
		if (token && token !== undefined) {
			goto('/');
		}
	}

	async function handleSignup() {
		const res = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password })
		});

		const data = await res.json();
		// console.log(data);
		message = data.message || data.error;

		red = !!data.error;

		if (res.ok) {
			// localStorage.setItem('token', data.token); // -> No need for that
			auth.set({ token: data.token, isLoggedIn: true }); // It will be saved in LocalStorage
			username = '';
			email = '';
			password = '';
			toast.success('Logged in successfully!');
			setTimeout(() => {
				goto('/profile');
			}, 2000);
		} else {
			toast.error(data.error || 'Login failed. Try again.');
		}
	}
</script>

<div class="flex min-h-screen items-center justify-between gap-x-8">
	<div class="relative w-[50%]">
		<span class="overflow-hidden">
			<img
				src="https://images.unsplash.com/photo-1743102254227-1d3134f39615?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
				class="h-svh -translate-y-20"
			/>
		</span>
		<div class="absolute right-20 top-[40%] z-20 w-full max-w-md">
			<h2 class="oswald text-end text-5xl font-bold uppercase">Welcome back !</h2>
			<p class="lora text-md mt-3 text-end italic leading-3">
				We hope you ready to dive into the world of <span class="text-primary">pictues</span> again .
			</p>
		</div>
	</div>

	<div class="flex-1">
		<div class="lora w-[80%] px-5 italic text-black">
			<div class="mb-8 flex flex-col items-center justify-center">
				<h1 class="text-3xl font-bold text-white">Log In</h1>
				<div class="mt-4 h-1 w-[50px] bg-white"></div>
			</div>
			<form on:submit|preventDefault={handleSignup} class="">
				<div class="flex flex-col gap-y-3 text-white">
					<Input type="email" bind:value={email} placeholder="Email" required />
					<Input type="username" bind:value={username} placeholder="username" required />
					<Input type="password" bind:value={password} placeholder="Password" required />

					<span class="my-2 text-center text-sm text-muted-foreground/70">
						Don't have an account ?
						<a href="/signup" class="text-primary underline">Sign up</a>
						now .
					</span>
					<Button type="submit" class="lora w-2/3 place-self-center italic">Log In</Button>

					{#if message}
						<p class={` ${red ? 'text-red-600' : 'text-green-600'} mt-1 text-center`}>{message}</p>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

<!-- {#if message}<p>{message}</p>{/if} -->
