<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';

	let first_name = '';
	let last_name = '';
	let username = '';
	let email = '';
	let password = '';
	let message = '';

	let red = false;

	async function handleSignup() {
		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ first_name, last_name, username, email, password })
		});

		// console.log(res)

		const data = await res.json();
		localStorage.setItem('token', data.token);

		// console.log(data)
		message = data.message || data.error;

		red = message === data.error;

		goto('/')
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
			<h2 class="oswald text-end text-5xl font-bold uppercase">Welcome here !</h2>
			<p class="lora text-md mt-3 text-end italic leading-3">
				We hope you ready to dive into the world of <span class="text-primary">pictues</span> .
			</p>
		</div>
	</div>

	<div class="flex-1">
		<div class="lora w-[80%] px-5 italic text-black">
			<div class="mb-8 flex flex-col items-center justify-center">
				<h1 class="text-3xl font-bold text-white">Sign Up</h1>
				<div class="mt-4 h-1 w-[50px] bg-white"></div>
			</div>
			<form on:submit|preventDefault={handleSignup} class="">
				<div class="flex flex-col gap-y-3 text-white">
					<span class="flex items-center justify-center gap-x-1">
						<Input type="first_name" bind:value={first_name} placeholder="First Name" required />
						<Input type="last_name" bind:value={last_name} placeholder="Last Name" required />
					</span>
					<Input type="email" bind:value={email} placeholder="Email" required />
					<Input type="username" bind:value={username} placeholder="Username" required />
					<Input type="password" bind:value={password} placeholder="Password" required />

					<span class="my-2 text-center text-sm text-muted-foreground/70">
						Already have an account ?
						<a href="/login" class="text-primary underline">Log In</a>
						now .
					</span>
					<Button type="submit" class="lora w-2/3 place-self-center italic">Sign Up</Button>

					<!-- <p class="text-center">created</p> -->

					{#if message}
						<p class={` ${red? 'text-red-600': 'text-green-600'} text-center mt-1`}>{message}</p>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>
