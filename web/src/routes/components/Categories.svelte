<script lang="ts">
	import { register } from 'swiper/element/bundle';
	import { ChevronRight, ChevronLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import Device from 'svelte-device-info';

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
	let isMobile = Device.isMobile;
	let isTablet = Device.isTablet;

	// export let handleCategories;

	const URL = '/api/categories?limit=12';

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
	slides-per-view={isMobile? 3.4: isTablet ? 5.7 : 9.5}
>
	{#if isLoading}
		<p class="text-muted-foreground">Loading anime list...</p>
	{:else}
		{#each Categories as category}
			<swiper-slide class="w-[10rem] ">
				<a  href={`?category=${category.title.toLowerCase()}`} class="overflow-hidden w-full relative flex items-center justify-center">
					<img
						class="aspect-video w-full object-cover"
						src={category.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
						alt={category?.title ?? 'Anime'}
					/>
					<div class="absolute inset-0 h-full w-full bg-black/30"></div>
					<p class="absolute line-clamp-1 text-xs font-bold uppercase text-white">
						{category.title}
					</p>
				</a>
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
