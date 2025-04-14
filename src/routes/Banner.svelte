<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import { register } from 'swiper/element/bundle';
	import { ChevronRight, ChevronLeft } from '@lucide/svelte';

	register();

	let { animeList, isLoading }: { animeList: any[]; isLoading: boolean } = $props();
</script>

<div
	class="swiper-button-next absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white"
>
	<ChevronRight size={36} />
</div>
<div
	class="swiper-button-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white"
>
	<ChevronLeft size={36} />
</div>

<swiper-container
	class="mySwiper"
	navigation="true"
	navigation-next-el=".swiper-button-next"
	navigation-prev-el=".swiper-button-prev"
	space-between="30"
	loop="true"
	centered-slides="true" 
	autoplay-delay="2500" 
	autoplay-disable-on-interaction="false"
>
	{#if isLoading}
		<p class="text-muted-foreground">Loading anime list...</p>
	{:else}
		{#each animeList.slice(0,5) as anime}
			<swiper-slide>
				<div class="relative h-[88vh] w-full px-10">
					<img
						class="absolute right-0 top-0 h-full w-[73vw] object-cover"
						src={anime?.image_url}
						alt={anime?.title ?? 'Anime'}
					/>

					<div
						class="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"
					></div>

					<div
						class="relative bottom-0 z-10 flex h-full max-w-lg flex-col justify-end px-8 pb-10 text-white"
					>
						<div>
							<h1 class="mb-4 text-4xl font-bold text-foreground">{anime.title}</h1>

							<!-- <div class="mb-2 flex gap-x-1 text-muted-foreground/80">
								{#each anime.genres as genre}
									<p>{genre.name} |</p>
								{/each}
							</div> -->

							<p class="mb-5 line-clamp-4 text-base text-secondary-foreground/80">
								{anime.description}
							</p>
						</div>
						<Button class="w-[60%]">Learn More</Button>
					</div>
				</div>
			</swiper-slide>
		{/each}
	{/if}
</swiper-container>

<style>
	swiper-container {
		width: 100%;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #000;
	}
</style>
