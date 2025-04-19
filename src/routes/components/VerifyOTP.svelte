<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { Mail, MoveLeft } from '@lucide/svelte';

	export let email: string;
	export let tempToken: string;
	export let onClose: () => void;
	export let onSuccess: (token: string) => void;

	let otpValues: string[] = ['', '', '', '', '', ''];
	let otpRefs: HTMLInputElement[] = [];
	let message = '';
	let red = false;
	let isResending = false;
	let otpError = '';

	onMount(() => {
		// Focus the first input when component mounts
		if (otpRefs[0]) {
			otpRefs[0].focus();
		}
	});

	// Handle input in any OTP box
	function handleOTPInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value.replace(/[^0-9]/g, '');
		
		// Update the current box value
		otpValues[index] = value.slice(-1); // Take only the last character if multiple entered
		
		// Auto-focus next input if current one is filled
		if (value && index < 5) {
			otpRefs[index + 1].focus();
		}
		
		// Clear error if all boxes are filled
		if (otpValues.every(val => val !== '')) {
			otpError = '';
		}
	}

	// Handle keyboard navigation and paste functionality
	function handleKeyDown(index: number, event: KeyboardEvent) {
		// Handle backspace
		if (event.key === 'Backspace') {
			if (!otpValues[index] && index > 0) {
				// If current box is empty and backspace is pressed, go to previous box
				otpRefs[index - 1].focus();
			}
		} 
		// Handle left arrow key
		else if (event.key === 'ArrowLeft' && index > 0) {
			otpRefs[index - 1].focus();
		} 
		// Handle right arrow key
		else if (event.key === 'ArrowRight' && index < 5) {
			otpRefs[index + 1].focus();
		}
	}

	// Handle paste functionality
	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const paste = (event.clipboardData || window.clipboardData).getData('text');
		const pasteDigits = paste.replace(/[^0-9]/g, '').slice(0, 6);
		
		// Fill the OTP boxes with the pasted digits
		for (let i = 0; i < pasteDigits.length; i++) {
			if (i < 6) {
				otpValues[i] = pasteDigits[i];
			}
		}
		
		// Focus the next empty box or the last box if all are filled
		const nextEmptyIndex = otpValues.findIndex(val => val === '');
		if (nextEmptyIndex !== -1) {
			otpRefs[nextEmptyIndex].focus();
		} else if (pasteDigits.length > 0) {
			otpRefs[Math.min(pasteDigits.length - 1, 5)].focus();
		}

		// Clear error if all boxes are filled
		if (otpValues.every(val => val !== '')) {
			otpError = '';
		}
	}

	// Get the complete OTP
	function getOTP(): string {
		return otpValues.join('');
	}

	// Validate OTP before submission
	function validateOTP(): boolean {
		const otp = getOTP();
		if (!otp || otp.length !== 6) {
			otpError = 'Please enter a complete 6-digit OTP';
			return false;
		}
		return true;
	}

	async function handleVerifyOTP(event: Event) {
		event.preventDefault();
		if (!validateOTP()) {
			toast.error(otpError);
			return;
		}

		const otp = getOTP();
		const res = await fetch('/api/auth/verify-otp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, otp, tempToken })
		});

		const data = await res.json();
		message = data.message || data.error;
		red = !!data.error;

		if (res.ok) {
			toast.success('Email verified successfully! Account created.');
			onSuccess(data.token);
		} else {
			toast.error(data.error || 'OTP verification failed. Try again.');
			otpError = data.error || 'Invalid OTP';
		}
	}

	async function handleResendOTP() {
		isResending = true;
		const res = await fetch('/api/auth/resend-otp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const data = await res.json();
		if (res.ok) {
			toast.success('New OTP sent successfully!');
			message = '';
			otpValues = ['', '', '', '', '', ''];
			otpError = '';
			// Focus the first input box after resend
			if (otpRefs[0]) {
				otpRefs[0].focus();
			}
		} else {
			toast.error(data.error || 'Failed to resend OTP. Try again.');
			message = data.error || 'Failed to resend OTP.';
			red = true;
		}
		isResending = false;
	}
</script>

<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" transition:fade role="dialog" aria-modal="true">
	<div class="bg-muted/80 border border-gray-600 p-8 rounded-xl w-full max-w-md shadow-lg text-white">
		<div class="flex flex-col items-center text-center">
			<Mail size={40} strokeWidth={3} />
			<h1 class="text-3xl font-bold mb-1 flex items-center gap-x-2 oswald">
				Verify Your Email
			</h1>
			<div class="h-1 w-[50px] my-4 bg-white"></div>
			<p class="text-sm text-gray-300 mb-6 ">We've sent a 6-digit OTP to your email <span class="font-medium">{email}</span>. Enter it below to verify and complete your signup.</p>
		</div>

		<form on:submit={handleVerifyOTP} novalidate class="space-y-4 lora">
			<div>
				<label class="block text-sm mb-1">Email Address</label>
				<input
					type="email"
					bind:value={email}
					placeholder="Email"
					required
					disabled
					class="w-full p-2 border border-gray-600 rounded-md bg-transparent text-white placeholder:text-gray-400"
				/>
			</div>

			<div>
				<label class="block text-sm mb-1">Enter OTP</label>
				<div class="flex gap-2 justify-between">
					{#each otpValues as _, index}
						<input
							type="text"
							maxlength="1"
							inputmode="numeric"
							bind:value={otpValues[index]}
							bind:this={otpRefs[index]}
							on:input={(e) => handleOTPInput(index, e)}
							on:keydown={(e) => handleKeyDown(index, e)}
							on:paste={handlePaste}
							class="w-12 h-12 text-center p-0 border border-gray-600 rounded-md bg-transparent text-white text-xl font-bold focus:border-primary focus:ring-1 focus:ring-primary"
						/>
					{/each}
				</div>
				{#if otpError}
					<p class="mt-1 text-sm text-red-500" aria-live="polite">{otpError}</p>
				{/if}
			</div>

			<Button type="submit" class="w-full  text-white font-semibold py-2 rounded-md transition-all lora ">
				Verify & Continue
			</Button>

			{#if message}
				<p class={`mt-2 text-center text-sm ${red ? 'text-primary' : 'text-green-500'}`} aria-live="polite">
					{message}
				</p>
			{/if}
		</form>

		<div class="mt-6 text-center space-y-2">
			<p class="text-sm text-gray-400">
				Didn't receive the code? 
				<button
					on:click={handleResendOTP}
					disabled={isResending}
					class="ml-1 text-red-500 underline hover:text-primary-dark disabled:opacity-50"
				>
					{isResending ? 'Resending...' : 'Resend OTP'}
				</button>
			</p>

			<button
				on:click={onClose}
				class="text-sm text-gray-400 hover:text-white bg-black/30 lora italic px-3 py-2 rounded-md flex items-center justify-center place-self-center gap-x-2"
			>
			<MoveLeft size={16} strokeWidth={2.75} />
			Cancel and go back
			</button>
		</div>
	</div>
</div>

<style>
	input:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
</style>