<script lang="ts">
	import { Camera, ImagePlus, EyeClosed } from '@lucide/svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { user } from '@/stores/user';

	// console.log($user?.username)

	let image = {
		title: '',
		description: '',
		username: $user?.username,
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
			toast.success('Image uploaded successfully! ');

			// Reset form after submission
			image = {
				title: '',
				description: '',
				username: '',
				image_url: '',
				categories: ''
			};

			// Redirect after a short delay
			// setTimeout(() => goto('/gallery'), 1500);
		} else {
			toast.error('Failed to upload image. Please try again.');
			console.error('Upload failed');
		}
	}
</script>

<div class="mx-auto flex flex-col justify-center gap-y-10 lg:flex-row">
	<div class="relative w-full overflow-hidden lg:w-[60%]">
		<div class="w-full overflow-hidden rounded-lg lg:w-2/3">
			<img
				src={image.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'}
				alt="Image Preview"
				class="h-[400px] object-cover md:h-[600px] lg:h-[600px]"
			/>
		</div>
		<div
			class="absolute bottom-0 right-0 flex flex-col justify-end rounded-lg bg-gradient-to-t from-black/80 via-gray-400/30 to-transparent p-5 lg:p-6 w-full
			lg:max-w-[18rem] lg:bottom-60 lg:right-32 max-lg:h-[400px] lg:bg-border/20 lg:bg-gradient-to-tr lg:from-black/80 lg:to-gray-400/30 lg:backdrop-blur-sm"
		>
			<h1 class="lora leading-12 text-3xl font-semibold italic text-white">
				Show the World Your
				<b class="oswald relative inline-block border-b-4 border-white font-bold not-italic">
					Vision
					<span class="absolute -right-8 top-0 flex flex-col items-center">
						<EyeClosed class="h-6 w-7 rotate-180 text-white" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 -translate-y-3"
						>
							<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
							<path
								fill-rule="evenodd"
								d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</b>
			</h1>
			<p class="raleway mt-8 md:mt-3 max-lg:mb-4 lg:mt-8 text-sm text-white">
				Upload your best moments captured through the lens. Need ideas?
				<a href="/" class="lora font-semibold italic underline">Check the inspiration gallery</a>.
			</p>
		</div>
	</div>

	<!-- Upload Form -->
	<div class="flex flex-1">
		<form
			on:submit|preventDefault={handleSubmit}
			class="lora relative flex w-full flex-col gap-y-6 overflow-hidden rounded-lg border bg-muted/40 shadow-lg lg:w-[85%]"
		>
			<div class="bg-black/50 py-12">
				<h2
					class="lora flex w-full items-center justify-center gap-x-2 text-2xl font-bold italic tracking-tighter"
				>
					Upload a New
					<span
						class="oswald relative mt-2 place-self-center border-b-4 border-white pb-1 text-3xl not-italic tracking-tighter "
					>
						Image
						<ImagePlus class="absolute -right-7 top-0" />
					</span>
				</h2>
				<p class="mt-2 text-center text-sm italic text-muted-foreground/50">
					Fill in the details below and showcase your creativity.
				</p>
			</div>

			<div class="flex flex-col gap-y-6 max-md:px-4 px-8 pb-8">
				<label>
					<p class="mb-1 italic">Title <small class="text-[0.6rem] font-bold">*</small></p>
					<Input
						bind:value={image.title}
						name="title"
						placeholder="Example: City from Above"
						class="raleway bg-muted/40 placeholder:text-xs placeholder:text-muted-foreground/30"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Description <small class="text-[0.6rem] font-bold">*</small></p>
					<Input
						bind:value={image.description}
						name="description"
						placeholder="Example: A drone's view of a sprawling city."
						class="raleway bg-muted/40 placeholder:text-xs placeholder:text-muted-foreground/30"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">Image URL <small class="text-[0.6rem] font-bold">*</small></p>
					<Input
						bind:value={image.image_url}
						name="image_url"
						placeholder="Example: https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
						class="raleway bg-muted/40 placeholder:text-xs placeholder:text-muted-foreground/30"
						required
					/>
				</label>

				<label>
					<p class="mb-1 italic">
						Categories
						<span class="text-xs text-white/70">(comma-separated)</span>
						<small class="text-[0.6rem] font-bold">*</small>
					</p>
					<Input
						bind:value={image.categories}
						name="categories"
						placeholder="Example: city, urban, skyline, droneview"
						class="raleway bg-muted/40 placeholder:text-xs placeholder:text-muted-foreground/30"
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
