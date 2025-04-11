<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let score: number = 0; // score out of 10

	let progress = tweened(0, { duration: 1000, easing: cubicOut });
	let observer: IntersectionObserver;
	let circleEl: HTMLDivElement;

	const radius = 24;
	const circumference = 2 * Math.PI * radius;

	onMount(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					progress.set(score * 10); // convert score to percentage
					observer.disconnect();
				}
			},
			{ threshold: 0.6 }
		);

		observer.observe(circleEl);
	});
</script>

<div bind:this={circleEl} class="relative h-16 w-16">
	<svg class="h-8 w-8 -rotate-90 transform" viewBox="0 0 60 60">
		<circle
			cx="30"
			cy="30"
			r={radius}
			stroke="#e5e7eb"
			stroke-width="10"
			fill="none"
		/>
		<circle
			cx="30"
			cy="30"
			r={radius}
			stroke="#facc15"
			stroke-width="10"
			fill="none"
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={$progress === 0
				? circumference
				: circumference - ($progress / 100) * circumference}
			style="transition: stroke-dashoffset 0.5s ease-out;"
		/>
	</svg>
	<div class="absolute inset-0 flex items-center justify-center text-sm font-bold text-yellow-500">
		{score ?? 'N/A'}
	</div>
</div>
