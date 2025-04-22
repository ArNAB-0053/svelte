<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import { auth } from '@/stores/auth';
	import { toast } from 'svelte-sonner';
	import { Check, X, Loader2 } from '@lucide/svelte';
	import VerifyOtp from '../../components/VerifyOTP.svelte';

	let first_name = '';
	let last_name = '';
	let username = '';
	let email = '';
	let password = '';
	let message = '';
	let red = false;
	let usernameAvailable: boolean | null = null;
	let usernameLoading = false;
	let usernameError: string | null = null;
	let showOTPModal = false;
	let tempToken = '';
	let otpEmail = '';
	let signupLoading = false; // Add loading state for signup

	// Debounce function to limit API calls
	let timeout: NodeJS.Timeout | null = null;
	function debounce(fn: () => void, delay: number) {
		return () => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(fn, delay);
		};
	}

	// Check username availability
	async function checkUsername() {
		if (!username) {
			usernameAvailable = null;
			usernameError = null;
			return;
		}

		usernameLoading = true;
		usernameError = null;
		try {
			const res = await fetch('/api/auth/check-username', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username })
			});

			const data = await res.json();
			if (data.error) {
				usernameAvailable = null;
				usernameError = data.error;
			} else {
				usernameAvailable = data.available ?? false;
			}
		} catch (error) {
			usernameAvailable = null;
			usernameError = 'Error checking username availability';
		} finally {
			usernameLoading = false;
		}
	}

	const debouncedCheckUsername = debounce(checkUsername, 500);

	async function handleSignup() {
		if (usernameAvailable === false || usernameError) {
			toast.error(usernameError || 'Username is already taken');
			return;
		}

		signupLoading = true;
		const toastId = toast.loading('Signing up...'); // Show "Signing up..." toast

		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ first_name, last_name, username, email, password })
			});

			const data = await res.json();
			message = data.message || data.error;
			red = !!data.error;

			if (res.ok) {
				toast.success('Please verify your email with the OTP sent.', { id: toastId });
				otpEmail = data.email;
				tempToken = data.tempToken;
				showOTPModal = true;
			} else {
				toast.error(data.error || 'Signup failed. Try again.', { id: toastId });
			}
		} catch (error) {
			toast.error('An error occurred during signup.', { id: toastId });
		} finally {
			signupLoading = false;
		}
	}

	function handleOTPClose() {
		showOTPModal = false;
		first_name = '';
		last_name = '';
		username = '';
		email = '';
		password = '';
		usernameAvailable = null;
		usernameError = null;
		message = '';
		red = false;
	}

	function handleOTPSuccess(token: string) {
		auth.set({ token, isLoggedIn: true, email: otpEmail });
		showOTPModal = false;
		toast.success('Signed Up successfully!');
		toast.success('Redirecting to profile...', { duration: 2000 });
		setTimeout(() => {
			goto('/profile');
		}, 2000);
	}
</script>

<div class="relative flex max-lg:flex-col min-h-screen items-center justify-between gap-x-8 mb-10">
	<div class="relative lg:w-[50%]">
		<span
			class="relative overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black before:to-transparent"
		>
			<img
				src="https://images.unsplash.com/photo-1743102254366-8d5bccffebb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
				class="relative z-0 h-svh object-cover"
			/>
		</span>

		<div
			class="absolute lg:right-20 top-[40%] z-20 flex w-full lg:-w-md flex-col items-center justify-center lg:items-end lg:justify-end"
		>
			<h2 class="oswald text-center lg:text-end text-5xl font-bold uppercase">Join us today</h2>
			<p class="lora text-md mt-3 text-center lg:w-[80%] lg:text-end italic leading-4">
				Discover, share, and download stunning <span class="text-primary">images</span> with ease.
			</p>
		</div>
	</div>

	<div class="flex-1">
		<div class="lora lg:w-[80%] px-5 italic text-black">
			<div class="mb-8 flex flex-col items-center justify-center">
				<h1 class="text-3xl font-bold text-white">Sign Up</h1>
				<div class="mt-4 h-1 w-[50px] bg-white"></div>
			</div>
			<form on:submit|preventDefault={handleSignup}>
				<div class="flex flex-col gap-y-3 text-white">
					<span class="flex items-center justify-center gap-x-1">
						<Input type="text" bind:value={first_name} placeholder="First Name" required />
						<Input type="text" bind:value={last_name} placeholder="Last Name" required />
					</span>
					<Input type="email" bind:value={email} placeholder="Email" required />
					<div class="relative">
						<div
							class="flex items-center justify-start gap-x-2 rounded-md border px-3 py-2 text-sm"
						>
							@
							<input
								type="text"
								bind:value={username}
								on:input={debouncedCheckUsername}
								placeholder="Username"
								required
								class="w-full border-l bg-transparent pl-2 outline-none"
							/>
							{#if usernameLoading}
								<Loader2 class="absolute right-2 h-5 w-5 animate-spin text-gray-500" />
							{:else if usernameAvailable === true}
								<Check class="absolute right-2 h-5 w-5 text-green-500" />
							{:else if usernameAvailable === false || usernameError}
								<X class="absolute right-2 h-5 w-5 text-red-500" />
							{/if}
						</div>
						{#if usernameError}
							<p class="mt-1 text-sm text-red-500">{usernameError}</p>
						{/if}
					</div>
					<Input type="password" bind:value={password} placeholder="Password" required />
					<span class="my-2 text-center text-sm text-muted-foreground/70">
						Already have an account?
						<a href="/login" class="text-primary underline">Log In</a>
						now.
					</span>
					<Button
						type="submit"
						class="lora w-2/3 place-self-center italic"
						disabled={signupLoading}
					>
						{#if signupLoading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Signing Up...
						{:else}
							Sign Up
						{/if}
					</Button>
				</div>
			</form>
			{#if message}
				<p class={`mt-1 text-center ${red ? 'text-red-600' : 'text-green-600'}`} aria-live="polite">
					{message}
				</p>
			{/if}
		</div>
	</div>

	{#if showOTPModal}
		<div class="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm">
			<VerifyOtp
				email={otpEmail}
				{tempToken}
				onClose={handleOTPClose}
				onSuccess={handleOTPSuccess}
			/>
		</div>
	{/if}
</div>
