<script lang="ts">
	import { Camera, ImagePlus, EyeClosed  } from '@lucide/svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let image = {
		title: '',
		description: '',
		image_url: '',
		categories: ''
	};

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const payload = {
			...image,
			categories: image.categories.split(',').map((c) => c.trim())
		};

		const res = await fetch('/api/images', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ image: payload })
		});

		if (res.ok) {
			toast.success('Image uploaded successfully! 🎉');

			// Reset form after submission
			image = {
				title: '',
				description: '',
				image_url: '',
				categories: ''
			};

			// Redirect after a short delay
			setTimeout(() => goto('/gallery'), 1500);
		} else {
			toast.error('Failed to upload image. Please try again.');
			console.error('Upload failed');
		}
	}
</script>

<div class="flex flex-col lg:flex-row  gap-y-10 py-6 mx-auto justify-center">
	<div class="relative w-full lg:w-[60%] overflow-hidden ">
		<div class="w-full lg:w-2/3 rounded-lg overflow-hidden">
			<img
				src={image.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'}
				alt="Image Preview"
				class="h-[400px] lg:h-[600px] object-cover"
			/>
		</div>
		<div class="absolute bottom-0 right-0 bg-gradient-to-tr p-6 from-black/80 to-gray-400/30 flex flex-col justify-end rounded-lg
		lg:right-32 lg:bottom-60 lg:max-w-[18rem] lg:bg-border/20 lg:backdrop-blur-sm  ">
			<h1 class="text-3xl text-white font-semibold lora italic leading-12 ">
				Show the World Your
				<b class="relative inline-block not-italic border-b-4 border-white oswald font-bold  ">
					Vision
					<span class="absolute top-0 -right-8  flex flex-col items-center ">
						<EyeClosed class="text-white w-7 h-6 rotate-180" />
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 -translate-y-3">
							<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
							<path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
						</svg>
					</span>
				</b>
			</h1>
			<p class="text-white mt-8 text-sm raleway">
				Upload your best moments captured through the lens. Need ideas?
				<a href="/" class="underline font-semibold italic lora">Check the inspiration gallery</a>.
			</p>
		</div>
	</div>

	<!-- Upload Form -->
	<div class="flex-1 flex ">
		<form
			on:submit|preventDefault={handleSubmit}
			class="w-full lg:w-[85%] lora bg-muted/40 rounded-lg shadow-lg border flex flex-col gap-y-6 relative overflow-hidden"
		>
			<div class="bg-black/50 py-12">
				<h2 class="text-3xl tracking-tighter font-bold lora italic w-full flex items-center justify-center gap-x-2">
					Upload a New
					<span class="relative place-self-center mt-2 border-b-4 pb-1 border-white oswald not-italic text-4xl tracking-tighter ">
					Image
					<ImagePlus class="absolute top-0 -right-7" />
				</span>
				</h2>
				<p class="text-muted-foreground/50 mt-2 text-center text-sm italic">Fill in the details below and showcase your creativity.</p>
			</div>
			<div class="px-8 pb-8 flex flex-col gap-y-6">
				<label>
					<p class="mb-1 italic">Title <small class="font-bold text-[0.6rem]">*</small> </p>
					<Input
						bind:value={image.title}
						name="title"
						placeholder="Example: City from Above"
						class="placeholder:text-xs placeholder:text-muted-foreground/30 bg-muted/40 raleway"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Description <small class="font-bold text-[0.6rem]">*</small> </p>
					<Input
						bind:value={image.description}
						name="description"
						placeholder="Example: A drone's view of a sprawling city."
						class="placeholder:text-xs placeholder:text-muted-foreground/30 bg-muted/40 raleway"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Image URL <small class="font-bold text-[0.6rem]">*</small> </p>
					<Input
						bind:value={image.image_url}
						name="image_url"
						placeholder="Example: https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
						class="placeholder:text-xs placeholder:text-muted-foreground/30 bg-muted/40 raleway"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Categories
						<span class="text-xs text-white/70">(comma-separated)</span>
						<small class="font-bold text-[0.6rem]">*</small>
					</p>
					<Input
						bind:value={image.categories}
						name="categories"
						placeholder="Example: city, urban, skyline, droneview"
						class="placeholder:text-xs placeholder:text-muted-foreground/30 bg-muted/40 raleway"
						required
					/>
				</label>

				<Button type="submit" class="mt-4 w-full">
					<Camera />
					Upload Image
				</Button>
			</div>
		</form>
	</div>
</div>