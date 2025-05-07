<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { auth } from '@/stores/auth';

	let identifier = '';
	let password = '';
	let message = '';

	let red = false;

	if (browser) {
		const token = localStorage.getItem('token');
		if (token && token !== undefined) {
			goto('/');
		}
	}

	async function handleLogin() {
		const res = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identifier, password })
		});

		const data = await res.json();
		message = data.message || data.error;
		red = !!data.error;

		if (res.ok) {
			auth.set({ token: data.token, isLoggedIn: true });
			toast.success('Logged in successfully!');
			identifier = '';
			password = '';
			setTimeout(() => {
				goto('/profile');
			}, 2000);
		} else {
			toast.error(data.error || 'Login failed. Try again.');
		}
	}
</script>

<div class="flex max-lg:flex-col min-h-screen items-center justify-center lg:justify-between gap-x-8 mb-10">
	<div class="relative lg:w-[50%]">
		<span
			class="relative overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black before:to-transparent"
		>
			<img
				src="https://images.unsplash.com/photo-1743102254227-1d3134f39615?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
				class="relative z-0 h-svh object-cover "
			/>
		</span>

		<div
			class="absolute lg:right-20 top-[40%] z-20 flex w-full lg:max-w-md flex-col items-center justify-center lg:items-end lg:justify-end"
		>
			<h2 class="oswald text-center lg:text-end text-4xl lg:text-5xl font-bold uppercase">Welcome back !</h2>
			<p class="lora text-md mt-3 w-[85%] lg:w-[80%] text-center lg:text-end italic leading-4">
				Glad to have you here again. Start browsing and enjoy new <span class="text-primary"
					>pictures</span
				>.
			</p>
		</div>
	</div>

	<div class="flex-1 md:w-[80%] w-full  md:absolute top-2/3 z-20 lg:relative">
		<div class="lora w-full lg:w-[80%] px-5 italic text-black">
			<div class="mb-8 flex flex-col items-center justify-center">
				<h1 class="text-3xl font-bold text-white">Log In</h1>
				<div class="mt-4 h-1 w-[50px] bg-white"></div>
			</div>
			<form on:submit|preventDefault={handleLogin} class="w-full">
				<div class="flex flex-col gap-y-3 text-white">
					<div class="flex items-center justify-start gap-x-2 rounded-md border px-3 py-2 text-sm bg-muted/20 backdrop-blur-3">
						@
						<input
							type="text"
							bind:value={identifier}
							placeholder="Email or Username"
							required
							class="w-full border-l bg-transparent pl-2 outline-none"
						/>
					</div>
					<Input type="password" bind:value={password} placeholder="Password" required class="bg-muted/20 backdrop-blur-3" />

					<span class="my-2 text-center text-sm text-muted-foreground/70">
						Don't have an account ?
						<a href="/signup" class="text-primary underline">Sign up</a>
						now .
					</span>
					<Button type="submit" class="lora w-2/3 place-self-center italic">Log In</Button>
				</div>
			</form>
		</div>
	</div>
</div>
