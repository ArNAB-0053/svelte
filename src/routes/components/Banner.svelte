<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import { register } from 'swiper/element/bundle';
	import { ChevronRight, ChevronLeft } from '@lucide/svelte';

	register();

	export let animeList: any[];
	export let isLoading: boolean;
	export let handleClick;

	// let { animeList, isLoading }: { animeList: any[]; isLoading: boolean } = $props();
</script>

<div class="mb-6 mt-24 flex items-center justify-between px-6 lg:px-8">
	<h1 class="lora text-2xl font-black italic">
		Finding your <strong class="oswald not-italic">categories . . .</strong>
	</h1>
	<span class="flex items-center justify-end gap-x-2">
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

<div class="px-6 lg:px-8">
	<swiper-container
		class="mySwiper"
		navigation-next-el=".swiper-button-next"
		navigation-prev-el=".swiper-button-prev"
		space-between="30"
		loop="true"
		centered-slides="false"
		autoplay-delay="2500"
		autoplay-disable-on-interaction="false"
		slides-per-view="2.3"
		grid-rows="1"
	>
		{#if isLoading}
			<p class="text-muted-foreground">Loading anime list...</p>
		{:else}
			{#each animeList as anime}
				<swiper-slide>
					<a href={`categories?category=${anime.title.toLowerCase()}`}
						class="relative h-[55vh] w-full overflow-hidden rounded-lg"
					>
						<img
							class="absolute right-0 top-0 h-full w-[73vw] object-cover"
							src={anime.image_url.concat('?auto=format&fit=crop&w=600&h=600&dpr=2')}
							alt={anime?.title ?? 'Anime'}
						/>

						<div
							class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
						></div>

						<div
							class="relative bottom-0 z-10 flex h-full max-w-md flex-col justify-end px-8 pb-4 text-white"
						>
							<div>
								<h1 class="oswald mb-4 text-2xl font-bold text-foreground">{anime.title}</h1>

								<!-- <div class="mb-2 flex gap-x-1 text-muted-foreground/80">
									{#each anime.tags as tag}
										<p>{tag} |</p>
									{/each}
								</div> -->

								<p
									class="lora mb-5 line-clamp-2 text-sm italic leading-5 text-secondary-foreground/80"
								>
									{anime.description}
								</p>
							</div>
							<!-- <button class="w-[6rem] rounded-md py-1 bg-primary text-white text-sm">Learn More</button> -->
						</div>
					</a>
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
</style>
