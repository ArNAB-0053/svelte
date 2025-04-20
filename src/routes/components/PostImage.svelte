<script lang="ts">
	import { Camera, ImagePlus  } from '@lucide/svelte';
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

<div class="flex flex-col lg:flex-row gap-x-8 gap-y-10 py-6 mx-auto justify-center">
	<div class="relative w-full lg:w-[60%] overflow-hidden ">
		<div class="w-full lg:w-2/3 rounded-lg overflow-hidden">
			<img
				src={image.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'}
				alt="Image Preview"
				class="h-[400px] lg:h-[600px] object-cover"
			/>
		</div>
		<div class="absolute bottom-0 right-0 bg-gradient-to-t p-6 from-black/80 to-transparent flex flex-col justify-end rounded-lg
		lg:right-20 lg:bottom-60 lg:max-w-[20rem] lg:bg-border/20 lg:backdrop-blur-md  ">
			<h1 class="text-3xl text-white font-bold oswald leading-7 mb-5">Show the World Your Vision</h1>
			<p class="text-white text-sm raleway">
				Upload your best moments captured through the lens. Need ideas?
				<a href="/" class="underline font-semibold italic lora">Check the inspiration gallery</a>.
			</p>
		</div>
	</div>

	<!-- Upload Form -->
	<div class="flex-1 flex ">
		<form
			on:submit|preventDefault={handleSubmit}
			class="w-full lg:w-[80%] lora bg-muted/40 rounded-lg shadow-lg border flex flex-col gap-y-6 relative overflow-hidden"
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
						class="placeholder:text-xs placeholder:text-muted-foreground/30 raleway"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Description <small class="font-bold text-[0.6rem]">*</small> </p>
					<Input
						bind:value={image.description}
						name="description"
						placeholder="Example: A drone's view of a sprawling city."
						class="placeholder:text-xs placeholder:text-muted-foreground/30 raleway"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Image URL <small class="font-bold text-[0.6rem]">*</small> </p>
					<Input
						bind:value={image.image_url}
						name="image_url"
						placeholder="Example: https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
						class="placeholder:text-xs placeholder:text-muted-foreground/30 raleway"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Categories
						<span class="text-xs text-gray-400">(comma-separated)</span>
						<small class="font-bold text-[0.6rem]">*</small>
					</p>
					<Input
						bind:value={image.categories}
						name="categories"
						placeholder="Example: city, urban, skyline, droneview"
						class="placeholder:text-xs placeholder:text-muted-foreground/30 raleway"
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