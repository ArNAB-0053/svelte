<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { auth } from '@/stores/auth';
	import { goto } from '$app/navigation';
	import { MoveRight, Plus, Search, X } from '@lucide/svelte';
	import { jwtDecode } from 'jwt-decode';
	import { user } from '@/stores/user';
	let search = '';

	function handleSearch(e: Event) {
		e.preventDefault();
		if (search.trim()) {
			goto(`/q?q=${encodeURIComponent(search.trim())}`);
		}
	}

	let showMenu = false;
</script>

<header class="fixed inset-x-0 top-0 z-40 border-b border-border px-4 sm:px-6 lg:px-8 bg-background/60 backdrop-blur-md">
	<!-- LG -->
	<div class="flex h-16 items-center justify-between ">
		<a
			href="/"
			class="oswald flex items-center justify-start text-lg font-bold tracking-tight text-foreground"
		>
			<h1 class="lora text-3xl italic">Im</h1>
			<p class="oswald text-2xl">Galaxy</p>
			<span class="ml-1 h-3 w-3 translate-y-1.5 rounded-full bg-white"></span>
		</a>

		<nav class="lora hidden items-center gap-6 text-sm italic md:flex">
			<a href="/new" class="text-muted-foreground transition hover:text-foreground"> New </a>
			<a href="/popular" class="text-muted-foreground transition hover:text-foreground">
				Popular
			</a>
			<a href="/categories" class="text-muted-foreground transition hover:text-foreground">
				Categories
			</a>
		</nav>

		<div class="flex items-center justify-end gap-x-2 max-lg:hidden">
			<form
				on:submit={handleSearch}
				class=" flex items-center gap-2 rounded-md bg-muted/50 py-[0.2rem] pl-3 pr-[0.2rem]"
			>
				<input
					type="text"
					placeholder="Search..."
					bind:value={search}
					class="flex-1 bg-transparent text-sm outline-none"
				/>
				<button
					type="submit"
					class="ease rounded-md border-l bg-gray-500/20 p-1.5 text-gray-300 transition-all duration-200 hover:bg-gray-400/20 hover:text-gray-300/80"
				>
					<Search size={18} />
				</button>
			</form>
			<a href="/add-image" class="lora hidden gap-3 italic sm:flex">
				<Button class="rounded-md ">
					<Plus />
					Add Image
				</Button>
			</a>

			{#if $auth.token && $auth.isLoggedIn}
				<a
					href="/profile"
					class="lora hidden h-8 aspect-square gap-3 rounded-full border-2 border-white bg-muted italic sm:flex"
				>
					<button class="h-full w-full">
						{$user?.first_name[0]}
					</button>
				</a>
			{:else}
				<a href="/login" class="lora hidden gap-3 italic sm:flex">
					<Button>Login</Button>
				</a>
			{/if}
		</div>

		<div class="md:hidden">
			{#if !showMenu}
				<Button
					aria-label="Toggle Menu"
					onclick={() => {
						showMenu = true;
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</Button>
			{:else}
				<Button
					aria-label="Toggle Menu"
					onclick={() => {
						showMenu = false;
					}}
				>
					<X />
				</Button>
			{/if}
		</div>
	</div>
	
	<!-- MD -->
	<div class="md:flex lg:hidden hidden gap-x-3 mt-1 bg-muted/80 px-5 py-4 rounded-lg mb-4">
		<form on:submit={handleSearch} class=" flex w-full overflow-hidden rounded-lg border border-zinc-700/60 py-1 pl-4 pr-2 items-center justify-between">
			<input
				type="text"
				placeholder="Search..."
				bind:value={search}
				class="bg-transparent text-sm outline-none"
			/>
			<button
				type="submit"
				class="ease flex  items-center justify-center rounded-md p-1.5 text-gray-300 transition-all duration-200 hover:bg-gray-400/20 hover:text-gray-300/80"
			>
				<Search size={18} />
			</button>
		</form>

		<a href="/add-image" class="lora gap-3 italic flex">
			<Button class="rounded-md ">
				<Plus />
				Add Image
			</Button>
		</a>

		{#if $auth.token && $auth.isLoggedIn}
			<a
				href="/profile"
				class=" lora hidden h-8 aspect-square gap-3 rounded-full border-2 border-white bg-muted italic sm:flex"
			>
				<button class="h-full w-full">
					{$user?.first_name[0]}
				</button>
			</a>
		{:else}
			<a href="/login" class="lora hidden gap-3 italic sm:flex">
				<Button>Login</Button>
			</a>
		{/if}

	</div>

	<!-- SM -->
	{#if showMenu}
		<div
			class="flex min-h-screen w-64 flex-col gap-y-4 bg-gradient-to-t from-black to-transparent p-4"
		>
			<nav class="lora flex flex-col gap-6 text-sm italic">
				<a href="/new" class="text-muted-foreground transition hover:text-foreground"> New </a>
				<a href="/popular" class="text-muted-foreground transition hover:text-foreground">
					Popular
				</a>
				<a href="/categories" class="text-muted-foreground transition hover:text-foreground">
					Categories
				</a>
			</nav>

			<div class="h-[1px] w-full bg-border"></div>

			<div class="flex w-full flex-col gap-y-2">
				<form
					on:submit={handleSearch}
					class=" flex w-full rounded-md border bg-muted/90 py-1 pl-4 pr-2"
				>
					<input
						type="text"
						placeholder="Search..."
						bind:value={search}
						class="bg-transparent text-sm outline-none"
					/>
					<button
						type="submit"
						class="ease flex flex-1 items-center justify-center rounded-md p-1.5 text-gray-300 transition-all duration-200 hover:bg-gray-400/20 hover:text-gray-300/80"
					>
						<Search size={18} />
					</button>
				</form>

				<div class="my-4 h-[1px] w-full bg-border"></div>

				<a href="/add-image" class="lora flex w-full gap-3 italic">
					<Button class="w-full rounded-md">
						<Plus />
						Add Image
					</Button>
				</a>

				{#if $auth.token && $auth.isLoggedIn}
					<a
						href="/profile"
						class="lora group flex items-center justify-center gap-3 rounded-md bg-zinc-800 py-2 italic transition-all duration-100 ease-linear hover:bg-muted hover:text-white/70"
					>
						<button class="flex items-center justify-center gap-x-2 text-xs italic">
							Go to profile <MoveRight
								class="transition-all duration-100 ease-linear group-hover:translate-x-2"
							/>
						</button>
					</a>
				{:else}
					<div class="my-4 h-[2px] w-1/2 place-self-center bg-white"></div>
					<a href="/login" class="lora flex w-full gap-3 italic">
						<Button class="w-full ">Login</Button>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</header>
