<script>
	import Input from '@/components/ui/input/input.svelte';

	let imageUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470';

	// FOR NOW IT NOT REQURED WHEN STORAGE WILL BE THERE THEN GONNA NEED THIS.
	// const onImageChange = (event) => {
	// 	if (event.target.files && event.target.files[0]) {
	// 		imageUrl = URL.createObjectURL(event.target.files[0])
	// 	}
	// }
</script>

<div class="flex items-start justify-between gap-x-8 max-lg:flex-col">
	<!-- IT NOT NEEDED NOW, LATER WHEN THE STORAGE WILL BE THERE THEN IT WILL BE USED -->
	<!-- <div class="flex-1 flex flex-col items-start lora italic">
		<img src={imageUrl} alt="" class="">

		<label for="myfile" class="lora italic">Select a file:</label>
		<input type="file" id="myfile" name="myfile" accept="image/*" onchange={onImageChange}>
	</div> -->

	<div class="lora flex flex-1 flex-col items-start italic relative">
		<img src={imageUrl} alt="" class="rounded-lg" />
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-start justify-end p-8">
			<h1 class="oswald not-italic text-4xl font-bold mb-2">Add your image here .</h1>
			<p>Let's show your talent to the world . Visit <a href="/" class="italic font-semibold underline">here</a> for the inspiration. </p>
		</div>
	</div>

	<form method="POST" class="min-h-screen w-1/2">
		<label>
			<p class="my-2 mb-1 italic">Add title</p>
			<Input name="description" autocomplete="off" />
		</label>
		<label>
			<p class="my-2 mb-1 italic">Add description</p>
			<Input name="description" autocomplete="off" />
		</label>
		<label>
			<p class="my-2 mb-1 italic">Add image url</p>
			<Input name="description" autocomplete="off" />
		</label>
	</form>
</div>
