<script lang="ts">
	import { CornerRightDown, Download, Minus, MoveLeft, SquareLibrary, SquareRoundCorner } from '@lucide/svelte';
	import Sidebar from '../../../components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import Button from '@/components/ui/button/button.svelte';

	export let data;
	let isLoading = true;
	let imageData;
	const URL = `/api/image?id=${data.slug}`;
	console.log(data.slug);

	onMount(async () => {
		try {
			const response = await fetch(URL);
			const data = await response.json();
			imageData = data;
			console.log('RRR', imageData);
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	});
	// console.log(imageData);
</script>

<a href="/">
	<Button
		variant="outline"
		class="lora ml-6 mt-24 rounded-full border border-white/20 bg-muted/10 text-xs font-light italic text-white/50 md:mt-40 lg:ml-8 lg:mt-24"
	>
		<MoveLeft /> Back Home
	</Button>
</a>

<div class=" flex min-h-screen items-start max-lg:flex-col-reverse lg:justify-between gap-x-16 px-6 pb-20 pt-10 lg:px-8">
	<div class="flex-1 max-lg:mt-7">
		<h2 class="lora italic mb-4 rounded-md  flex overflow-hidden items-center py-3 text-2xl font-bold relative">
			<SquareLibrary strokeWidth={2.75} class="absolute left-0" />
			<strong class="ml-7 ">You May Also Like</strong>
			<CornerRightDown strokeWidth={3} size={30} class="mt-4 ml-2" />
		</h2>
		<Sidebar />
	</div>

	{#if imageData}
		<div
			class="flex w-full flex-col items-start justify-center gap-x-3 rounded-lg bg-secondary p-5 md:w-[60%]"
		>
			<div class="flex w-full items-center justify-center bg-secondary">
				<span
					class="flex h-[50vh] w-auto items-center justify-center overflow-hidden rounded-lg shadow-lg lg:h-[95vh]"
				>
					<img
						src={imageData.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
						alt={imageData.title || 'Image'}
						class="h-full w-auto object-cover"
					/>
				</span>
			</div>

			<div class="my-6 h-[1px] w-full bg-zinc-600/50"></div>

			<span class="relative flex w-full lg:items-center gap-y-5 max-lg:flex-col lg:justify-between">
				<div class="flex-1">
					<h1 class="oswald text-bold text-3xl">{imageData.title}</h1>
					<p class="lora text-bold mt-2 text-sm italic text-white/70">{imageData.description}</p>
					<span class="mt-5 flex items-center justify-start gap-x-1 text-xs">
						{#each imageData.categories as category}
							<p class="rounded-sm bg-black px-1.5 py-1 text-xs text-muted-foreground">
								{category}
							</p>
						{/each}
					</span>
				</div>

				<a
					href={imageData.image_url}
					target="_blank"
					class="lora flex items-center justify-center gap-x-2 rounded-md bg-primary px-8 py-3 text-xl font-semibold italic"
					download
				>
					Download
					<Download />
				</a>
			</span>
		</div>
	{/if}
</div>
