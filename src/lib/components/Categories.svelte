<script lang="ts">
	import { register } from 'swiper/element/bundle';
	import { ChevronRight, ChevronLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';

	register();

	type Category = {
		id: number;
		title: string;
		description: string;
		image_url: string;
		tags: string[];
	};

	let Categories: Category[] = [];
	let isLoading = true;

	const URL = 'http://localhost:5173/api/get-images?limit=12';

	onMount(async () => {
		try {
			const response = await fetch(URL);
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.status}`);
			}
			Categories = await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<!-- <div class="px-6 lg:px-[2.3rem]">
	<swiper-container
		class="mySwiper"
		navigation-next-el=".swiper-button-next"
		navigation-prev-el=".swiper-button-prev"
		space-between="3"
		loop="true"
		centered-slides="false"
		autoplay-delay="2500"
		autoplay-disable-on-interaction="false"
		slides-per-view="6"
		grid-rows="1"
	>
		{#if isLoading}
			<p class="text-muted-foreground">Loading anime list...</p>
		{:else}
			{#each Categories as category}
				<swiper-slide>
					<img
						class="absolute right-0 top-0 h-full object-cover"
						src={category.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
						alt={category?.title ?? 'Anime'}
					/>
				</swiper-slide>
			{/each}
		{/if}
	</swiper-container>
</div>

<style>
	swiper-container {
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	swiper-slide {
		/* height: calc((100% - 30px) / 2) !important; */
		display: flex;
		justify-content: center;
		align-items: center;
		background: #000;
		border-radius: 2rem;
	}
</style> -->

<div class="mb-3 flex items-center justify-between">
	<h2 class="lora text-3xl font-semibold italic text-gray-300">
		Top <strong class="font-black text-white">Categories</strong>
	</h2>
	<span class="relative flex items-center justify-end gap-x-2">
		<div
			class="swiper-button-prev cursor-pointer rounded-sm bg-muted/70 text-muted-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-white"
		>
			<ChevronLeft size={30} />
		</div>
		<div
			class="swiper-button-next cursor-pointer rounded-sm bg-muted/70 text-muted-foreground transition-all duration-200 ease-in-out hover:bg-muted hover:text-white"
		>
			<ChevronRight size={30} />
		</div>
	</span>
</div>

<swiper-container
	class="mySwiper"
	navigation-next-el=".swiper-button-next"
	navigation-prev-el=".swiper-button-prev"
	space-between="10"
	loop="true"
	centered-slides="false"
	autoplay-delay="2500"
	autoplay-disable-on-interaction="false"
	slides-per-view="10"
>
	{#if isLoading}
		<p class="text-muted-foreground">Loading anime list...</p>
	{:else}
		{#each Categories as category}
			<swiper-slide class="w-[10rem] overflow-hidden">
				<img
					class="aspect-video w-full object-cover"
					src={category.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
					alt={category?.title ?? 'Anime'}
				/>
				<div class="absolute inset-0 h-full w-full bg-black/30"></div>
				<p class="absolute line-clamp-1 text-xs font-bold uppercase text-white ">
					{category.tags[0]}
				</p>
			</swiper-slide>
		{/each}
	{/if}
</swiper-container>

<style>
	swiper-container {
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	swiper-slide {
		/* height: calc((100% - 30px) / 2) !important; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #000;
		position: relative;
	}
</style>
