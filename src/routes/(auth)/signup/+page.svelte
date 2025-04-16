<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";

	let email = '';
	let password = '';
	let message = '';

	async function handleSignup() {
		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();
		message = data.message || data.error;
	}
</script>

<form on:submit|preventDefault={handleSignup} class="mt-20 px-5 text-black">
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<Button type="submit">Sign Up</Button>
</form>

{#if message}<p>{message}</p>{/if}