<div class="flex min-h-screen items-center justify-between gap-x-8">
	<div class="relative w-[50%]">
		<span class="overflow-hidden">
			<img
				src="https://images.unsplash.com/photo-1743102254227-1d3134f39615?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
				class="h-svh -translate-y-20"
			/>
		</span>
		<div class="absolute right-20 top-[40%] z-20 w-full max-w-md">
			<h2 class="oswald text-end text-5xl font-bold uppercase">Welcome back !</h2>
			<p class="lora text-md mt-3 text-end italic leading-3">
				We hope you ready to dive into the world of <span class="text-primary">pictues</span> again .
			</p>
		</div>
	</div>

	<div class="flex-1">
		<div class="lora w-[80%] px-5 italic text-black">
			<div class="mb-8 flex flex-col items-center justify-center">
				<h1 class="text-3xl font-bold text-white">Log In</h1>
				<div class="mt-4 h-1 w-[50px] bg-white"></div>
			</div>
			<form on:submit|preventDefault={handleSignup} class="">
				<div class="flex flex-col gap-y-3 text-white">
					<Input type="email" bind:value={email} placeholder="Email" required />
					<Input type="username" bind:value={username} placeholder="username" required />
					<Input type="password" bind:value={password} placeholder="Password" required />

					<span class="text-muted-foreground/70 text-center my-2 text-sm">
						Don't have an account ? 
						<a href="/signup" class="text-primary underline">Sign up</a>
						now .
					</span>
					<Button type="submit" class="lora italic w-2/3 place-self-center">Log In</Button>
				</div>
			</form>
		</div>
	</div>
</div>